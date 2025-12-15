import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PopularSection from "@/components/PopularSection";
import RecentSection from "@/components/RecentSection";
import FeaturesShowcase from "@/components/FeaturesShowcase";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";
import BottomNavbar from "@/components/BottomNavbar";
import SkullRadialMenu from "@/components/SkullRadialMenu";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden noise-bg">
      <Navbar />
      <SkullRadialMenu />
      <main className="pb-20 md:pb-0">
        <HeroSection />
        <PopularSection />
        <RecentSection />
        <FeaturesShowcase />
        <CTASection />
      </main>
      <FooterSection />
      <BottomNavbar />
    </div>
  );
};

export default Index;
