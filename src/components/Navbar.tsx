import { Button } from "@/components/ui/button";
import { Menu, X, Search, Home, BookOpen, Sparkles, Rocket, Star } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Início", href: "/", icon: Home },
  { label: "Mangás", href: "/catalogo?tipo=manga", icon: BookOpen },
  { label: "Manhwas", href: "/catalogo?tipo=manhwa", icon: Sparkles },
  { label: "Lançamentos", href: "/#lancamentos", icon: Rocket },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href.split("?")[0]);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 hidden lg:block">
      <div className="mx-2 mt-2 sm:mx-4 sm:mt-4 md:mx-8">
        <nav className="bg-card/95 backdrop-blur-sm border border-border rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-lg">
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-base sm:text-xl font-impact tracking-wider text-foreground group-hover:text-primary transition-colors">
                JUSTICE
              </span>
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex items-center gap-1.5 px-2 xl:px-3 py-2 text-xs xl:text-sm font-display uppercase tracking-wide transition-all duration-300 border-b-2 whitespace-nowrap ${
                    isActive(item.href)
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-primary/50"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {/* Premium - Destacado */}
              <Link 
                to="/premium" 
                className="flex items-center gap-1.5 px-3 xl:px-4 py-2 ml-2 text-xs xl:text-sm font-display uppercase tracking-wide bg-primary text-primary-foreground border border-primary hover:bg-accent transition-all duration-300 whitespace-nowrap rounded-lg"
              >
                <Star className="w-4 h-4" />
                PREMIUM
              </Link>

            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-lg">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="font-display uppercase tracking-wide text-muted-foreground hover:text-foreground whitespace-nowrap rounded-lg">
                Entrar
              </Button>
              <Button size="sm" className="font-display uppercase tracking-wide bg-primary text-primary-foreground hover:bg-accent border-none whitespace-nowrap rounded-lg">
                Criar Conta
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 hover:bg-secondary transition-colors rounded-lg"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden pt-4 pb-2 animate-fade-up border-t border-border mt-4">
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 font-display uppercase tracking-wide transition-colors ${
                      isActive(item.href)
                        ? "bg-primary/10 text-primary border-l-2 border-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                ))}
                
                <Link 
                  to="/premium"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 font-display uppercase tracking-wide text-primary bg-primary/10 border-l-2 border-primary mt-2"
                >
                  <Star className="w-5 h-5" />
                  PREMIUM
                </Link>

                <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                  <Button variant="outline" className="flex-1 font-display uppercase" onClick={() => setIsOpen(false)}>
                    Entrar
                  </Button>
                  <Button className="flex-1 font-display uppercase" onClick={() => setIsOpen(false)}>
                    Criar Conta
                  </Button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;