import { useState } from "react";
import { Home, Library, Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Início", href: "#", id: "inicio" },
  { icon: Library, label: "Coleção", href: "#colecao", id: "colecao" },
  { icon: Search, label: "Pesquisar", href: "#pesquisar", id: "pesquisar" },
  { icon: Sparkles, label: "Explorar", href: "#mais", id: "explorar" },
];

const BottomNavbar = () => {
  const [activeItem, setActiveItem] = useState("inicio");
  const [splashKey, setSplashKey] = useState(0);

  const handleClick = (id: string) => {
    setActiveItem(id);
    setSplashKey(prev => prev + 1); // Trigger splash animation
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/60 backdrop-blur-lg border-t border-border/30 md:hidden" style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 8px)' }}>
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = activeItem === item.id;
          
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={() => handleClick(item.id)}
              className="relative flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-lg transition-all duration-300 active:scale-90"
            >
              {/* Blood splatter effect behind active icon */}
              <div
                className={cn(
                  "absolute inset-0 transition-all duration-500 ease-out",
                  isActive 
                    ? "opacity-100 scale-100" 
                    : "opacity-0 scale-75"
                )}
              >
                {/* SVG blood splatter shape */}
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full"
                  style={{ filter: "blur(1px)" }}
                >
                  <defs>
                    <radialGradient id="bloodGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="hsl(0, 70%, 25%)" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="hsl(0, 80%, 18%)" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="hsl(0, 85%, 12%)" stopOpacity="0.3" />
                    </radialGradient>
                    <filter id="bloodGlow">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  {/* Organic blood splatter shape */}
                  <path
                    d="M50 15 
                       Q65 20 70 30 
                       Q80 35 78 50 
                       Q85 60 75 70 
                       Q78 80 65 82 
                       Q55 90 45 85 
                       Q30 88 25 75 
                       Q15 70 20 55 
                       Q12 45 22 35 
                       Q18 25 30 22 
                       Q40 12 50 15Z"
                    fill="url(#bloodGradient)"
                    filter="url(#bloodGlow)"
                    className={cn(
                      "transition-all duration-500",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {/* Additional organic drips */}
                  <ellipse cx="72" cy="65" rx="8" ry="12" fill="url(#bloodGradient)" opacity="0.6" />
                  <ellipse cx="28" cy="60" rx="6" ry="10" fill="url(#bloodGradient)" opacity="0.5" />
                  <ellipse cx="55" cy="78" rx="7" ry="5" fill="url(#bloodGradient)" opacity="0.4" />
                </svg>
                
                {/* Dark glow underneath */}
                <div 
                  className="absolute inset-0 rounded-full bg-black/30 blur-md -z-10"
                  style={{ transform: "scale(0.8)" }}
                />
              </div>

              {/* Splash animation on touch */}
              {isActive && (
                <div
                  key={splashKey}
                  className="absolute inset-0 pointer-events-none"
                >
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible">
                    <defs>
                      <radialGradient id="splashGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="hsl(0, 70%, 30%)" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="hsl(0, 80%, 20%)" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    {/* Animated splash droplets */}
                    <circle cx="50" cy="50" r="5" fill="url(#splashGradient)" className="animate-splash-center" />
                    <circle cx="30" cy="35" r="4" fill="url(#splashGradient)" className="animate-splash-1" />
                    <circle cx="70" cy="30" r="3" fill="url(#splashGradient)" className="animate-splash-2" />
                    <circle cx="25" cy="60" r="3.5" fill="url(#splashGradient)" className="animate-splash-3" />
                    <circle cx="75" cy="65" r="4" fill="url(#splashGradient)" className="animate-splash-4" />
                    <circle cx="45" cy="25" r="2.5" fill="url(#splashGradient)" className="animate-splash-5" />
                    <circle cx="60" cy="75" r="3" fill="url(#splashGradient)" className="animate-splash-6" />
                  </svg>
                </div>
              )}

              {/* Icon */}
              <item.icon 
                className={cn(
                  "w-5 h-5 relative z-10 transition-all duration-300",
                  isActive 
                    ? "text-red-100 drop-shadow-[0_0_8px_rgba(139,0,0,0.8)]" 
                    : "text-muted-foreground"
                )} 
              />
              
              {/* Label */}
              <span 
                className={cn(
                  "text-[10px] font-medium relative z-10 transition-all duration-300",
                  isActive 
                    ? "text-red-100" 
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavbar;