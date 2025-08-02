import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WaitlistForm } from "@/components/WaitlistForm";
import { ContactForm } from "@/components/ContactForm";
import { 
  MapPin, 
  MessageSquare, 
  CreditCard, 
  Shield, 
  Users, 
  Store,
  Languages,
  Smartphone,
  Star,
  Globe
} from "lucide-react";

import heroBeach from "@/assets/hero-beach.jpg";
import appRestaurantSearch from "@/assets/app-restaurant-search.jpg";
import appEventBooking from "@/assets/app-event-booking.jpg";
import appPayment from "@/assets/app-payment.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBeach})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Discover Cuba's
              <span className="block bg-gradient-sunset bg-clip-text text-transparent">
                Hidden Treasures
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Connect with local merchants, discover authentic experiences, and explore Cuba like never before
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="sunset" size="lg" className="text-lg px-8 py-6">
                <Smartphone className="mr-2 h-5 w-5" />
                Join Waitlist
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Store className="mr-2 h-5 w-5" />
                Partner With Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Why Travel Cuba?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Bridging the gap between curious travelers and passionate local merchants across Cuba
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="bg-gradient-ocean w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">Discover Hidden Gems</h3>
                <p className="text-muted-foreground">
                  Find authentic restaurants, exciting events, unique tours, and local shops that only locals know about.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="bg-gradient-sunset w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">Direct Communication</h3>
                <p className="text-muted-foreground">
                  Chat directly with merchants in multiple languages. AI features break down language barriers effortlessly.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="bg-gradient-tropical w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">Smart Payments</h3>
                <p className="text-muted-foreground">
                  Save on transaction fees, avoid ATM hassles, and enjoy secure prepaid booking with transparent pricing.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="bg-gradient-ocean w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">Safety First</h3>
                <p className="text-muted-foreground">
                  Verified merchants, agreed prices, and quality assurance help you avoid scams and enjoy peace of mind.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="bg-gradient-sunset w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Languages className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">AI-Powered Experience</h3>
                <p className="text-muted-foreground">
                  Get personalized recommendations, instant translations, and tailored offers based on your preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="bg-gradient-tropical w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">Support Local Communities</h3>
                <p className="text-muted-foreground">
                  Every booking supports locally-owned businesses and helps strengthen Cuban communities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* App Showcase Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              See Travel Cuba in Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From discovering local restaurants to booking unique experiences - here's how Travel Cuba works
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="relative mb-6">
                <img 
                  src={appRestaurantSearch} 
                  alt="Search for restaurants in Travel Cuba app"
                  className="rounded-2xl shadow-soft max-w-sm mx-auto"
                />
                <div className="absolute -top-4 -left-4 bg-gradient-ocean text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">Discover & Search</h3>
              <p className="text-muted-foreground">
                Browse restaurants, events, tours, and shops with smart filters and personalized recommendations.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="relative mb-6">
                <img 
                  src={appEventBooking} 
                  alt="Book events and chat with merchants in Travel Cuba app"
                  className="rounded-2xl shadow-soft max-w-sm mx-auto"
                />
                <div className="absolute -top-4 -left-4 bg-gradient-sunset text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">Connect & Chat</h3>
              <p className="text-muted-foreground">
                Chat directly with merchants, ask questions, and get personalized service in multiple languages.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="relative mb-6">
                <img 
                  src={appPayment} 
                  alt="Secure payment and booking in Travel Cuba app"
                  className="rounded-2xl shadow-soft max-w-sm mx-auto"
                />
                <div className="absolute -top-4 -left-4 bg-gradient-tropical text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">Book & Pay Safely</h3>
              <p className="text-muted-foreground">
                Secure payments, transparent pricing, and verified merchants ensure a worry-free experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Merchants Section */}
      <section className="py-20 bg-gradient-ocean text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Para Comerciantes Cubanos
            </h2>
            <p className="text-xl mb-12 opacity-90">
              Haz crecer tu negocio y conecta con viajeros de todo el mundo
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">Gratis Unirse</h3>
                <p className="opacity-90">
                  Sin cuotas de registro ni sistemas POS costosos. Comienza a promocionar tu negocio inmediatamente.
                </p>
              </div>

              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">Comisión Baja</h3>
                <p className="opacity-90">
                  Paga menos que otros servicios de pago con precios transparentes y justos que ayudan a crecer tu negocio.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <WaitlistForm />
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h3 className="text-2xl font-display font-bold mb-4">Travel Cuba</h3>
            <p className="mb-6 opacity-90">
              Connecting travelers and local merchants across beautiful Cuba
            </p>
            <p className="text-sm opacity-75">
              © 2024 Travel Cuba. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;