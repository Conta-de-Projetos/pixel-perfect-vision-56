import { useRef, useEffect } from 'react';

/**
 * Hook para adicionar funcionalidade de 'drag-to-scroll' (arrastar para rolar)
 * a um elemento horizontalmente.
 * @returns Um ref que deve ser anexado ao elemento container.
 */
export const useDragScroll = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      element.classList.add('cursor-grabbing');
      startX.current = e.pageX - element.offsetLeft;
      scrollLeft.current = element.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDragging.current = false;
      element.classList.remove('cursor-grabbing');
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      element.classList.remove('cursor-grabbing');
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - element.offsetLeft;
      const walk = (x - startX.current) * 1.5; // Multiplicador para velocidade de rolagem
      element.scrollLeft = scrollLeft.current - walk;
    };

    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mouseup', handleMouseUp);
    element.addEventListener('mousemove', handleMouseMove);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mouseup', handleMouseUp);
      element.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return ref;
};