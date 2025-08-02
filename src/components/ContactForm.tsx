import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
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
    
    // Simulate sending email to localcoinapp@gmail.com
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We'll contact you soon about merchant partnership opportunities.",
      });
      setFormData({ name: "", email: "", business: "", message: "" });
      setIsLoading(false);
    }, 1000);
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
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Partner With Us
        </h3>
        <p className="text-muted-foreground">
          Connect your local business with travelers
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            name="name"
            placeholder="Your name"
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
            placeholder="Email address"
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
            placeholder="Business name (optional)"
            value={formData.business}
            onChange={handleChange}
            className="pl-10"
          />
        </div>
        
        <Textarea
          name="message"
          placeholder="Tell us about your business and how you'd like to partner with Travel Cuba..."
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
          {isLoading ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
};