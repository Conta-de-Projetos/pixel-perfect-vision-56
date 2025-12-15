import { ChevronRight, Twitter, MessageCircle, Instagram, Mail, ArrowUp } from "lucide-react";
import skullFooter from "@/assets/skull-footer.png";

const footerLinks = {
  Explorar: ["Populares", "Lançamentos", "Categorias", "Rankings"],
  Conta: ["Meu Perfil", "Favoritos", "Histórico", "Configurações"],
  Recursos: ["Premium", "App Mobile", "Como Usar", "FAQ"],
  Legal: ["Privacidade", "Termos", "DMCA", "Contato"]
};

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Discord", icon: MessageCircle, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
];

const FooterSection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-border/20 overflow-hidden">
      {/* Epic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-card via-background to-background" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary/5 to-transparent" />
        
        {/* Skull watermark */}
        <div className="absolute -bottom-20 -right-20 md:right-10 w-[300px] md:w-[400px] h-[300px] md:h-[400px] opacity-[0.03] pointer-events-none">
          <img src={skullFooter} alt="" className="w-full h-full object-contain" />
        </div>
        
        {/* Ambient glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10">
        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-4 flex flex-col items-center text-center md:items-center md:text-center lg:items-start lg:text-left">
              {/* Logo with Skull */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
                <img 
                  src={skullFooter} 
                  alt="Justice" 
                  className="w-full h-full object-contain relative z-10 invert opacity-90"
                />
              </div>
              <div>
                <h3 className="text-2xl font-impact tracking-wider text-foreground">
                  JUSTICE
                </h3>
                <p className="text-xs text-primary font-medium tracking-widest uppercase">
                  Onde heróis nascem
                </p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed max-w-sm">
              Sua plataforma definitiva para mangás, manhwas e HQs. 
              Logo mais lançamos nosso app Justice.
            </p>
              
              {/* Newsletter Mini */}
              <div className="w-full max-w-sm">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input 
                      type="email" 
                      placeholder="Seu melhor e-mail"
                      className="w-full pl-10 pr-4 py-3 bg-card/80 border border-border/50 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <button className="px-5 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium text-sm transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95">
                    Assinar
                  </button>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center gap-3 mt-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-11 h-11 rounded-full bg-card/80 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/10"
                    aria-label={social.name}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Grid */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
                {Object.entries(footerLinks).map(([category, links]) => (
                  <div key={category} className="text-center md:text-center lg:text-left">
                    <h4 className="font-display uppercase tracking-wider mb-4 sm:mb-5 text-foreground text-sm">
                      {category}
                    </h4>
                    <ul className="space-y-2 sm:space-y-3 md:flex md:flex-col md:items-center lg:items-start">
                      {links.map((link) => (
                        <li key={link}>
                          <a 
                            href="#" 
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 inline-flex items-center gap-2 group sm:flex"
                          >
                            <ChevronRight className="w-3 h-3 hidden sm:block opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-primary" />
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/20">
          <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <p className="text-xs text-muted-foreground text-center sm:text-left">
                © 2026 JUSTICE. Todos os direitos reservados.
              </p>
              
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
                {/* Scroll to top */}
                <button 
                  onClick={scrollToTop}
                  className="w-9 h-9 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 hover:scale-110"
                  aria-label="Voltar ao topo"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;