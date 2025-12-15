import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Star } from "lucide-react";
import justiceiroCover from "@/assets/justiceiro-cover.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-32 pb-20 grunge-texture">
      {/* Background image with enhanced overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={justiceiroCover} 
          alt="Background" 
          className="w-full h-full object-cover opacity-15 scale-105 animate-pulse"
          style={{ animationDuration: '8s' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background opacity-80" />
      </div>

      {/* Animated particles/lines */}
      <div className="absolute top-1/4 left-0 w-40 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60 animate-pulse" />
      <div className="absolute top-1/3 right-0 w-56 h-px bg-gradient-to-l from-transparent via-primary to-transparent opacity-60 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/3 left-0 w-32 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-40 animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/4 w-24 h-px bg-gradient-to-l from-transparent via-primary/50 to-transparent opacity-30 animate-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Main Title with enhanced animation */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-impact leading-[1.1] mb-6 animate-fade-up-delay-1 tracking-wider max-w-4xl mx-auto">
          LOGO MAIS LANÇAMOS
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-primary/80 drop-shadow-lg">
            NOSSO APP JUSTICE
          </span>
        </h1>

        {/* Subtitle with better contrast */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 animate-fade-up-delay-2 leading-relaxed">
          Mergulhe em um universo de mangás e HQs. 
          <br />
          Leitura sem limites, atualizações diárias.
        </p>

        {/* Blood line separator with glow */}
        <div className="relative max-w-md mx-auto mb-8 animate-fade-up-delay-2">
          <div className="blood-line" />
          <div className="absolute inset-0 blood-line blur-sm opacity-50" />
        </div>

        {/* CTA Buttons with enhanced styling */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up-delay-3">
          <Button 
            size="lg" 
            className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary px-8 py-6 text-base font-display uppercase tracking-wider group shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105"
          >
            <BookOpen className="mr-2 w-5 h-5 group-hover:animate-pulse" />
            COMEÇAR A LER
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="w-full sm:w-auto border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary hover:text-primary hover:bg-primary/10 px-8 py-6 text-base font-display uppercase tracking-wider group transition-all duration-300 transform hover:scale-105"
          >
            <Star className="mr-2 w-5 h-5 group-hover:fill-primary group-hover:scale-110 transition-all" />
            VER PREMIUM
          </Button>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;