import { useState, useEffect } from 'react';

export const useImageColor = (imageUrl: string, enabled: boolean = true) => {
  const [dominantColor, setDominantColor] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || !imageUrl) {
      setDominantColor(null);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) return;

        // Use small canvas for performance
        const size = 10;
        canvas.width = size;
        canvas.height = size;
        
        ctx.drawImage(img, 0, 0, size, size);
        
        const imageData = ctx.getImageData(0, 0, size, size).data;
        
        // Calculate average color from edges (more representative of cover art)
        let r = 0, g = 0, b = 0, count = 0;
        
        for (let i = 0; i < imageData.length; i += 4) {
          // Skip very dark or very light pixels
          const brightness = (imageData[i] + imageData[i + 1] + imageData[i + 2]) / 3;
          if (brightness > 30 && brightness < 220) {
            r += imageData[i];
            g += imageData[i + 1];
            b += imageData[i + 2];
            count++;
          }
        }
        
        if (count > 0) {
          r = Math.round(r / count);
          g = Math.round(g / count);
          b = Math.round(b / count);
          
          // Increase saturation slightly for more vibrant borders
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const saturationBoost = 1.3;
          
          if (max !== min) {
            const mid = (max + min) / 2;
            r = Math.min(255, Math.round(mid + (r - mid) * saturationBoost));
            g = Math.min(255, Math.round(mid + (g - mid) * saturationBoost));
            b = Math.min(255, Math.round(mid + (b - mid) * saturationBoost));
          }
          
          setDominantColor(`rgb(${r}, ${g}, ${b})`);
        }
      } catch (error) {
        // Fallback if color extraction fails
        setDominantColor(null);
      }
    };

    img.onerror = () => {
      setDominantColor(null);
    };

    img.src = imageUrl;
  }, [imageUrl, enabled]);

  return dominantColor;
};
