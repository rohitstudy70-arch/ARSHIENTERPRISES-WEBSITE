import { useEffect } from 'react';
import Lenis from 'lenis';

export const useSmoothScroll = () => {
  useEffect(() => {
    // Disable smooth scroll interception on admin dashboard and forms
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 1.2,
      lerp: 0.1,
    });

    let frameId;
    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);
};
