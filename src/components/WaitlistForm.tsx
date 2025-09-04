import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail } from "lucide-react";

export const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('cuba_waitlist')
        .insert([{ email }]);

      if (error) {
        toast({
          title: "Error",
          description: error.message.includes('duplicate') 
            ? "This email is already on our waitlist!" 
            : "Something went wrong. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "¡Bienvenido a la lista de espera!",
          description: "Te notificaremos cuando Travel Cuba esté disponible.",
        });
        setEmail("");
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

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border shadow-soft">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-display font-bold text-foreground mb-2">
          Join the Waitlist
        </h3>
        <p className="text-muted-foreground">
          Be the first to discover Cuba's hidden gems
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            required
          />
        </div>
        
        <Button 
          type="submit" 
          variant="tropical" 
          size="lg" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? "Joining..." : "Join Waitlist"}
        </Button>
      </form>
    </div>
  );
};
