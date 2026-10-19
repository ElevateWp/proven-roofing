'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion } from '@/lib/motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextureBackgroundProps {
  variant?: 'hero' | 'divider' | 'Contato' | 'blog';
  className?: string;
  opacity?: number;
}

export default function TextureBackground({
  variant = 'hero',
  className = '',
  opacity,
}: TextureBackgroundProps) {
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion() || !turbRef.current || !containerRef.current) return;

    // Subtle texture drift on scroll
    const ctx = gsap.context(() => {
      gsap.to(turbRef.current, {
        attr: { baseFrequency: '0.018 0.024' },
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Default opacities based on permitted variants
  const defaultOpacity =
    variant === 'hero' ? 0.16 : variant === 'divider' ? 0.22 : variant === 'Contato' ? 0.14 : 0.12;
  const activeOpacity = opacity ?? defaultOpacity;

  return (
    <div
      ref={containerRef}
      className={`organic-texture-container select-none pointer-events-none ${className}`}
      style={{ opacity: activeOpacity }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={`mineral-vein-${variant}`} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.012 0.018"
              numOctaves="4"
              seed="42"
              result="turbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="42"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feColorMatrix
              type="matrix"
              values="
                0.15 0 0 0 0.15
                0 0.15 0 0 0.15
                0 0 0.15 0 0.15
                0 0 0 0.5 0
              "
            />
          </filter>

          <linearGradient id={`hero-mask-grad-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.2" />
            <stop offset="70%" stopColor="#0B2348" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0B2348" stopOpacity="0.95" />
          </linearGradient>

          <radialGradient id={`divider-radial-${variant}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0B2348" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#0B2348" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect
          width="100%"
          height="100%"
          fill={variant === 'divider' ? `url(#divider-radial-${variant})` : `url(#hero-mask-grad-${variant})`}
          filter={`url(#mineral-vein-${variant})`}
        />
      </svg>
    </div>
  );
}
