import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, Shield, Download, Bell, Crown, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import BottomNavbar from "@/components/BottomNavbar";

const plans = [
  {
    name: "Gratuito",
    price: "R$ 0",
    period: "/mês",
    description: "Perfeito para começar sua jornada",
    features: [
      "Acesso a títulos gratuitos",
      "Até 5 capítulos por dia",
      "Anúncios entre capítulos",
      "Qualidade padrão",
    ],
    cta: "Plano Atual",
    popular: false,
    disabled: true,
  },
  {
    name: "Premium",
    price: "R$ 19,90",
    period: "/mês",
    description: "A escolha mais popular",
    features: [
      "Acesso ilimitado a todos os títulos",
      "Leitura sem anúncios",
      "Download para leitura offline",
      "Qualidade HD",
      "Notificações de novos capítulos",
      "Acesso antecipado a lançamentos",
    ],
    cta: "Assinar Premium",
    popular: true,
    disabled: false,
  },
  {
    name: "Premium Anual",
    price: "R$ 149,90",
    period: "/ano",
    description: "Economize 37% no plano anual",
    features: [
      "Todos os benefícios do Premium",
      "Economia de R$ 89,00 por ano",
      "Badge exclusivo de apoiador",
      "Acesso beta a novos recursos",
      "Suporte prioritário",
    ],
    cta: "Assinar Anual",
    popular: false,
    disabled: false,
  },
];

const benefits = [
  {
    icon: Download,
    title: "Leitura Offline",
    description: "Baixe seus mangás favoritos e leia em qualquer lugar, mesmo sem internet.",
  },
  {
    icon: Bell,
    title: "Notificações",
    description: "Seja avisado instantaneamente quando seus títulos favoritos receberem novos capítulos.",
  },
  {
    icon: Zap,
    title: "Carregamento Rápido",
    description: "Servidores premium garantem páginas carregando em milissegundos.",
  },
  {
    icon: Shield,
    title: "Sem Anúncios",
    description: "Experiência de leitura limpa, sem interrupções ou pop-ups irritantes.",
  },
];

const Premium = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden noise-bg">
      <Navbar />
      <main className="pb-20 md:pb-0 pt-32">
        {/* Hero Section */}
        <section className="relative py-16 px-4 overflow-hidden">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-premium/30 bg-premium/10 mb-6">
              <Crown className="w-4 h-4 text-premium" />
              <span className="text-sm text-premium font-medium">Premium</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6 leading-tight">
              Leitura sem limites,
              <br />
              <span className="gradient-text">experiência premium</span>
            </h1>
            
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Desbloqueie acesso ilimitado a milhares de mangás, manhwas e novels. 
              Sem anúncios, com download offline e muito mais.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="relative py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-3xl p-8 transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-b from-premium/20 to-card border-2 border-premium/50 scale-105 shadow-2xl shadow-premium/20"
                      : "bg-card/50 border border-border/50 hover:border-border"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-premium text-premium-foreground text-sm font-semibold flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Mais Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-bold font-display mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm">{plan.description}</p>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-bold font-display">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                          plan.popular ? "bg-premium/20 text-premium" : "bg-primary/10 text-primary"
                        }`}>
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-sm text-foreground/90">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full py-6 rounded-2xl text-base font-semibold ${
                      plan.popular
                        ? "bg-premium text-premium-foreground hover:bg-premium/90 glow-premium"
                        : plan.disabled
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                    disabled={plan.disabled}
                  >
                    {plan.cta}
                    {!plan.disabled && <ArrowRight className="ml-2 w-5 h-5" />}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-16 px-4 bg-card/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold font-display text-center mb-12">
              Benefícios <span className="gradient-text">Premium</span>
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-premium/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-premium/10 flex items-center justify-center mb-4 group-hover:bg-premium/20 transition-colors">
                    <benefit.icon className="w-6 h-6 text-premium" />
                  </div>
                  <h3 className="text-lg font-semibold font-display mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ or Trust Section */}
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold font-display mb-4">Garantia de 7 dias</h2>
            <p className="text-muted-foreground mb-6">
              Experimente o Premium sem riscos. Se não gostar, devolvemos seu dinheiro 
              nos primeiros 7 dias, sem perguntas.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                Cancele quando quiser
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                Sem multas
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                Suporte 24/7
              </span>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
      <BottomNavbar />
    </div>
  );
};

export default Premium;
