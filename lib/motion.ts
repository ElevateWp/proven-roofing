/**
 * Proven Roofing Motion System Constants & Primitives
 * Strict adherence to the motion budget:
 * - GSAP 3 + Lenis ticker
 * - Transforms & Opacity only
 * - Eases: power3.out for entrances, power2.inOut for transitions, expo.out for long distance
 */

export const MOTION = {
  ease: {
    entrance: 'power3.out',
    transition: 'power2.inOut',
    travel: 'expo.out',
    css: 'cubic-bezier(0.16, 1, 0.3, 1)',
    count: 'power2.out',
  },
  duration: {
    micro: 0.25,
    quick: 0.45,
    medium: 0.75,
    panel: 1.1,
    long: 1.4,
    heroSequence: 2.3,
    heroSession: 0.8,
  },
  stagger: {
    word: 0.055,
    item: 0.06,
    button: 0.08,
  },
  lenis: {
    lerp: 0.085,
    duration: 1.15,
    wheelMultiplier: 1,
  },
} as const;

export const isReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
