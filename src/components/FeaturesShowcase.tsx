import { ArrowRight, Download, Bell, Zap, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import justiceiroCover from "@/assets/justiceiro-cover.jpg";

const features = [
  { icon: Download, text: "LEITURA OFFLINE DISPONÍVEL" },
  { icon: Bell, text: "NOTIFICAÇÕES DE NOVOS CAPÍTULOS" },
  { icon: Zap, text: "CARREGAMENTO ULTRA-RÁPIDO" },
  { icon: Shield, text: "SEM ANÚNCIOS INTRUSIVOS" },
];

const FeaturesShowcase = () => {
  return (
    <section id="premium" className="relative py-16 sm:py-24 px-4 overflow-hidden grunge-texture">
      {/* Blood line top */}
      <div className="blood-line max-w-4xl mx-auto mb-10 sm:mb-16" />

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="order-1">
            <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground font-display uppercase tracking-wider text-sm mb-4">
              PREMIUM
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-impact tracking-wider mb-4 sm:mb-6 leading-tight">
              LEITURA SEM LIMITES.
              <br />
              <span className="text-primary">PODER ABSOLUTO.</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-6 sm:mb-8">
              Acesso total ao universo sombrio de mangás e HQs. Sem barreiras. Sem piedade.
            </p>

            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {features.map((feature) => (
                <li key={feature.text} className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary border border-border flex items-center justify-center flex-shrink-0 rounded-lg">
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <span className="text-foreground font-display uppercase tracking-wide text-xs sm:text-sm">{feature.text}</span>
                </li>
              ))}
            </ul>

            {/* CTA PROMINENTE - Movido para cima no mobile */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
              <Button 
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-accent px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-display uppercase tracking-wider w-full sm:w-auto transition-all duration-300"
              >
                <Link to="/premium">
                  VER PLANOS
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-muted-foreground font-display uppercase tracking-wide">
                <Sparkles className="w-4 h-4 text-primary" />
                A PARTIR DE R$ 19,90/MÊS
              </div>
            </div>
          </div>

          {/* Right Visual - Justiceiro Featured - menor no mobile */}
          <div className="relative order-2">
            <div className="aspect-[3/4] max-w-xs sm:max-w-sm mx-auto overflow-hidden border-2 border-border relative rounded-lg">
              <img 
                src={justiceiroCover} 
                alt="O Justiceiro" 
                className="w-full h-full object-cover"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              
              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <span className="inline-block px-2 sm:px-3 py-1 bg-primary text-primary-foreground font-display uppercase tracking-wider text-[10px] sm:text-xs mb-2 sm:mb-3 rounded-md">
                  DESTAQUE DO MÊS
                </span>
                <h3 className="text-xl sm:text-2xl font-impact tracking-wider text-foreground mb-1 sm:mb-2">O JUSTICEIRO</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                  "Justiça não é gentil."
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary hover:text-primary hover:bg-primary/10 font-display uppercase tracking-wide text-xs sm:text-sm py-2 sm:py-3 rounded-2xl transition-all duration-300"
                >
                  LER AGORA
                </Button>
              </div>
            </div>

            {/* Blood accent lines - hidden on mobile */}
            <div className="absolute -top-2 -left-2 w-16 h-px bg-primary hidden sm:block" />
            <div className="absolute -top-2 -left-2 w-px h-16 bg-primary hidden sm:block" />
            <div className="absolute -bottom-2 -right-2 w-16 h-px bg-primary hidden sm:block" />
            <div className="absolute -bottom-2 -right-2 w-px h-16 bg-primary hidden sm:block" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;