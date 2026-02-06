// lib/lenis.ts
import Lenis from 'lenis';

let lenis = null;

export const getLenis = () => {
  if (typeof window === 'undefined') return null;

  if (!lenis) {
    lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true, // v1 syntax
      smoothTouch: false,
    });
  }

  return lenis;
};

export const startLenis = () => {
  getLenis()?.start();
};

export const stopLenis = () => {
  getLenis()?.stop();
};

export const destroyLenis = () => {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}
