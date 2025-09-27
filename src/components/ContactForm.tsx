// ContactForm.tsx
'use client';

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, User, Building2 } from "lucide-react";

/**
 * === PUT YOUR SITE KEY HERE ===
 * Replace the string below with your reCAPTCHA v3 SITE key.
 * For production, prefer to load this from NEXT_PUBLIC_... env var instead.
 */
const RECAPTCHA_SITE_KEY = "YOUR_RECAPTCHA_V3_SITE_KEY_HERE";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load the reCAPTCHA v3 script once
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) {
      console.warn("reCAPTCHA site key is not set.");
      return;
    }
    if ((window as any).grecaptcha) return; // already loaded

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // keep script (no need to remove)
    };
  }, []);

  const runRecaptcha = async (action = "submit") => {
    if (!(window as any).grecaptcha) {
      throw new Error("reCAPTCHA not loaded");
    }
    return new Promise<string>((resolve, reject) => {
      (window as any).grecaptcha.ready(() => {
        (window as any).grecaptcha
          .execute(RECAPTCHA_SITE_KEY, { action })
          .then((token: string) => resolve(token))
          .catch((err: any) => reject(err));
      });
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Validation",
        description: "Please fill name, email and message.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // run reCAPTCHA and get token
      const token = await runRecaptcha("contact_form");

      // Send data + token to your server API which will verify the token
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          business: formData.business,
          message: formData.message,
          recaptcha_token: token
        }),
      });

      const body = await res.json();

      if (!res.ok) {
        // server returned an error (includes recaptcha validation failures)
        console.error("Contact form submission error:", body);
        toast({
          title: "Error",
          description: body?.error || "Failed to submit. Try again.",
          variant: "destructive",
        });
      } else {
        // Optionally also insert into Supabase from frontend (if you want),
        // but we prefer the server to do the insertion so it's protected.
        toast({
          title: "¡Mensaje Enviado!",
          description: "Te contactaremos pronto sobre oportunidades de colaboración.",
        });
        setFormData({ name: "", email: "", business: "", message: "" });
      }
    } catch (err) {
      console.error("Contact form submission error:", err);
      toast({
        title: "Error",
        description: "reCAPTCHA failed or network error. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border shadow-soft">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2 font-display">
          Únete Como Socio
        </h3>
        <p className="text-muted-foreground">
          Conecta tu negocio local con viajeros
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            name="name"
            placeholder="Tu nombre"
            value={formData.name}
            onChange={handleChange}
            className="pl-10"
            required
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className="pl-10"
            required
          />
        </div>

        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            name="business"
            placeholder="Nombre del negocio (opcional)"
            value={formData.business}
            onChange={handleChange}
            className="pl-10"
          />
        </div>

        <Textarea
          name="message"
          placeholder="Cuéntanos sobre tu negocio y cómo te gustaría colaborar con Travel Cuba..."
          value={formData.message}
          onChange={handleChange}
          rows={4}
          required
        />

        <Button
          type="submit"
          variant="sunset"
          size="lg"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Enviando..." : "Enviar Mensaje"}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
