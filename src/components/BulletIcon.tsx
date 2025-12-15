import bulletIcon from "@/assets/balas.png";
import { cn } from "@/lib/utils";

interface BulletIconProps {
  direction?: "left" | "right";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const BulletIcon = ({ direction = "right", size = "md", className }: BulletIconProps) => {
  const sizeClasses = {
    sm: "w-8 h-5",
    md: "w-10 h-6",
    lg: "w-12 h-8",
  };

  return (
    <img
      src={bulletIcon}
      alt="Bala"
      className={cn(
        sizeClasses[size],
        "object-contain opacity-90 hover:opacity-100 transition-opacity",
        direction === "left" && "rotate-180",
        className
      )}
    />
  );
};

export default BulletIcon;
