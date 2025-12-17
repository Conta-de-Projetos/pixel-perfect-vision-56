import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import BottomNavbar from "@/components/BottomNavbar";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Settings, LogOut, User, Crown } from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
  { name: "Meu Perfil", href: "/perfil", icon: User, premium: false },
  { name: "Assinar Premium", href: "/premium", icon: Crown, premium: true },
  { name: "Configurações", href: "/settings", icon: Settings, premium: false },
  { name: "Sair", href: "/logout", icon: LogOut, premium: false },
];

const MenuPage = () => {
  useScrollToTop();
  
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden noise-bg">
      <Navbar />
      <main className="pt-32 pb-20 md:pb-0 max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-impact tracking-wider text-foreground mb-8 text-center">Menu Principal</h1>
        
        <div className="max-w-md mx-auto space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center justify-between p-4 bg-card/80 border border-border/50 rounded-xl hover:bg-primary/10 transition-colors duration-300 group"
            >
              <div className="flex items-center gap-4">
                <item.icon className={`w-5 h-5 ${item.premium ? 'text-amber-500' : 'text-primary'}`} />
                <span className="text-lg font-display uppercase tracking-wide text-foreground group-hover:text-primary transition-colors">
                  {item.name}
                </span>
              </div>
              {item.premium && (
                <Crown className="w-4 h-4 text-amber-500 fill-amber-500/30" />
              )}
            </Link>
          ))}
        </div>
      </main>
      <FooterSection />
      <BottomNavbar />
    </div>
  );
};

export default MenuPage;