import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-3xl opacity-50" />
        
        <div className="relative gradient-border p-12 md:p-16 text-center noise-bg">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">Junte-se a milhares de leitores</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6 leading-tight">
            Comece sua jornada
            <br />
            <span className="gradient-text">agora mesmo</span>
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            Crie sua conta grátis e tenha acesso a milhares de mangás, manhwas e novels. 
            Sua próxima história favorita está esperando.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-base rounded-2xl group font-display uppercase tracking-wider transition-all duration-300"
            >
              Criar Conta Grátis
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto border-border/50 bg-card/50 backdrop-blur-sm hover:border-foreground/50 hover:text-foreground hover:bg-secondary px-10 py-6 text-base rounded-2xl font-display uppercase tracking-wider transition-all duration-300"
            >
              Explorar Catálogo
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            Sem cartão de crédito • Acesso imediato • Cancele quando quiser
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;