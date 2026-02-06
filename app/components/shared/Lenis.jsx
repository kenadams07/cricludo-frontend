'use client';

import { useEffect } from 'react';
import { getLenis, destroyLenis } from '../../lib/Lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function LenisProvider() {
  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;

    // Sync Lenis scroll with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame to GSAP's ticker
    // This ensures that animations and scrolling are in sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP's internal lag smoothing for better performance with Lenis
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Cleanup
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.off('scroll', ScrollTrigger.update);
      destroyLenis();
    };
  }, []);

  return null;
}
