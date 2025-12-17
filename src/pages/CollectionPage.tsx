import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import BottomNavbar from "@/components/BottomNavbar";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const CollectionPage = () => {
  useScrollToTop();
  
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden noise-bg">
      <Navbar />
      <main className="pt-32 pb-20 md:pb-0 max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-impact tracking-wider text-primary mb-4">Minha Coleção</h1>
        <p className="text-muted-foreground">Esta página está em construção. Em breve, você poderá gerenciar seus favoritos e histórico aqui.</p>
      </main>
      <FooterSection />
      <BottomNavbar />
    </div>
  );
};

export default CollectionPage;