import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, User, Building2 } from "lucide-react";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('contacts')
        .insert([{
          name: formData.name,
          email: formData.email,
          business: formData.business || null,
          message: formData.message
        }]);

      if (error) {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "¡Mensaje Enviado!",
          description: "Te contactaremos pronto sobre oportunidades de colaboración.",
        });
        setFormData({ name: "", email: "", business: "", message: "" });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
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