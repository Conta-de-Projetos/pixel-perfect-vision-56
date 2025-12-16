import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook que força a rolagem da janela para o topo sempre que a rota muda.
 * Útil para garantir que novas páginas comecem no topo.
 */
export const useScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
};