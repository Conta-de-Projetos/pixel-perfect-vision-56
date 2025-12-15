import { useState, useEffect } from "react";
import { BookOpen, Clock, Download, User, Crown, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import caveira from "@/assets/caveira.png";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  angle: number;
  isOpen: boolean;
  onClick: () => void;
  delay: number;
  isPremium?: boolean;
  isActive?: boolean;
}

const MenuItem = ({ icon, label, angle, isOpen, onClick, delay, isPremium, isActive }: MenuItemProps) => {
  const radius = 100;
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;

  return (
    <button
      onClick={onClick}
      className={`absolute w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center
        transition-all duration-500 ease-out backdrop-blur-md shadow-xl group
        ${isPremium 
          ? 'bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/60 hover:border-primary hover:from-primary/30 hover:to-primary/10' 
          : isActive
            ? 'bg-gradient-to-br from-primary/40 to-primary/20 border-2 border-primary ring-2 ring-primary/30'
            : 'bg-card/90 border border-border/30 hover:border-foreground/20 hover:bg-card'}
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        hover:scale-110 active:scale-95`}
      style={{
        transform: isOpen 
          ? `translate(${x}px, ${y}px) scale(1) rotate(0deg)` 
          : `translate(0px, 0px) scale(0) rotate(-180deg)`,
        transitionDelay: isOpen ? `${delay}ms` : '0ms',
      }}
      aria-label={label}
    >
      {/* Premium crown badge */}
      {isPremium && (
        <div className="absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary flex items-center justify-center shadow-lg border-2 border-background">
          <Crown size={10} className="text-primary-foreground md:hidden" />
          <Crown size={12} className="text-primary-foreground hidden md:block" />
        </div>
      )}
      
      {/* Icon */}
      <div className={`transition-all duration-300 ${isPremium ? 'text-primary group-hover:text-primary' : 'text-foreground/80 group-hover:text-foreground'}`}>
        {icon}
      </div>
      
      {/* Tooltip */}
      <span className={`absolute top-full mt-2 whitespace-nowrap text-xs font-bold 
        bg-card backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border 
        pointer-events-none shadow-lg
        opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0
        ${isPremium ? 'text-primary-foreground bg-primary border-primary' : 'text-foreground'}`}
      >
        {label}
      </span>
    </button>
  );
};

const SkullRadialMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [readingMode, setReadingMode] = useState(false);

  const handleReadingModeToggle = () => {
    setReadingMode(prev => {
      const newState = !prev;
      if (newState) {
        toast.info("Modo Leitura ativado");
      } else {
        toast.info("Modo Leitura desativado");
      }
      return newState;
    });
  };

  const menuItems = [
    { icon: <BookOpen size={18} strokeWidth={1.5} className="md:hidden" />, label: readingMode ? "Desativar Leitura" : "Modo Leitura", angle: -90, action: handleReadingModeToggle, isActive: readingMode, iconMd: <BookOpen size={20} strokeWidth={1.5} className="hidden md:block" /> },
    { icon: <Clock size={18} strokeWidth={1.5} className="md:hidden" />, label: "Histórico", angle: 0, action: () => toast.info("Abrindo Histórico..."), iconMd: <Clock size={20} strokeWidth={1.5} className="hidden md:block" /> },
    { icon: <Download size={18} strokeWidth={1.5} className="md:hidden" />, label: "Downloads", angle: 90, action: () => toast("Funcionalidade Premium", { description: "Assine para desbloquear downloads offline." }), isPremium: true, iconMd: <Download size={20} strokeWidth={1.5} className="hidden md:block" /> },
    { icon: <User size={18} strokeWidth={1.5} className="md:hidden" />, label: "Perfil", angle: 180, action: () => toast.info("Abrindo Perfil..."), iconMd: <User size={20} strokeWidth={1.5} className="hidden md:block" /> },
  ];

  const handleToggle = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsOpen(!isOpen);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleClose = () => {
    if (isOpen && !isAnimating) {
      setIsAnimating(true);
      setIsOpen(false);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handleItemClick = (action: () => void) => {
    action();
    handleClose();
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <>
      {/* Visibility Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-28 lg:bottom-6 left-4 z-40 p-2.5 bg-card/80 backdrop-blur-sm border border-border rounded-full hover:border-primary transition-colors group"
        aria-label={isVisible ? "Esconder caveira" : "Mostrar caveira"}
      >
        {isVisible ? (
          <Eye className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        ) : (
          <EyeOff className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        )}
      </button>

      {/* Only show menu if visible */}
      {isVisible && (
        <>
          {/* Backdrop - more transparent */}
          <div 
            className={`fixed inset-0 bg-background/50 backdrop-blur-[2px] z-40 transition-opacity duration-500
              ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={handleClose}
          />

          {/* Menu Container - moves to center when open */}
          <div 
            className={`fixed z-50 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
              ${isOpen 
                ? 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' 
                : 'right-4 bottom-28 lg:bottom-6'}`}
          >
            {/* Menu Items */}
            <div className="relative flex items-center justify-center">
              {menuItems.map((item, index) => (
                <MenuItem
                  key={index}
                  icon={<>{item.icon}{item.iconMd}</>}
                  label={item.label}
                  angle={item.angle}
                  isOpen={isOpen}
                  onClick={() => handleItemClick(item.action)}
                  delay={index * 60}
                  isPremium={item.isPremium}
                  isActive={item.isActive}
                />
              ))}

              {/* Skull Button */}
              <button
                onClick={handleToggle}
                className={`relative z-10 flex items-center justify-center transition-all duration-500 ease-out group
                  ${isOpen 
                    ? 'w-20 h-20 md:w-24 md:h-24' 
                    : 'w-14 h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 animate-pulse-glow'}`}
                aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
              >
                {/* Glow effect when open */}
                <div 
                  className={`absolute inset-0 rounded-full bg-primary/20 blur-xl transition-all duration-700
                    ${isOpen ? 'opacity-100 scale-150' : 'opacity-0 scale-100'}`}
                />
                
                {/* Rotating particles effect when open */}
                {isOpen && (
                  <>
                    <div className="absolute w-2 h-2 rounded-full bg-primary/60 animate-spin" 
                      style={{ 
                        animationDuration: '3s',
                        transformOrigin: '50px 50px',
                        top: '50%',
                        left: '50%',
                      }} 
                    />
                    <div className="absolute w-1.5 h-1.5 rounded-full bg-primary/40 animate-spin" 
                      style={{ 
                        animationDuration: '4s',
                        animationDirection: 'reverse',
                        transformOrigin: '40px 40px',
                        top: '50%',
                        left: '50%',
                      }} 
                    />
                  </>
                )}

                {/* Skull image */}
                <img 
                  src={caveira} 
                  alt="Menu Caveira" 
                  className={`w-full h-auto invert transition-all duration-500
                    ${isOpen 
                      ? 'opacity-100 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]' 
                      : 'opacity-80 group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]'}`}
                />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SkullRadialMenu;
