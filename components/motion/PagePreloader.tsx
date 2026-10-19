'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PagePreloader() {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let finished = false;
    const finishIntro = () => {
      if (finished) return;
      finished = true;
      setIsVisible(false);
      document.body.style.overflow = '';
      window.dispatchEvent(new Event('resize'));
      try {
        ScrollTrigger.refresh();
      } catch {
        // The page should still be uncovered if a scroll trigger is unavailable.
      }
    };

    const ctx = gsap.context(() => {
      const revealPage = () => {
        const container = containerRef.current;
        if (!container || typeof container.animate !== 'function') {
          finishIntro();
          return;
        }

        const reveal = container.animate(
          [
            {
              clipPath:
                'polygon(0% 0%, 100% 0%, 100% 100%, 80% 100%, 80% 100%, 60% 100%, 60% 100%, 40% 100%, 40% 100%, 20% 100%, 20% 100%, 0% 100%)',
            },
            {
              clipPath:
                'polygon(0% 0%, 100% 0%, 100% 100%, 80% 100%, 80% 85%, 60% 85%, 60% 70%, 40% 70%, 40% 55%, 20% 55%, 20% 40%, 0% 40%)',
              offset: 0.68,
            },
            {
              clipPath:
                'polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%)',
            },
          ],
          {
            duration: 850,
            easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
            fill: 'forwards',
          }
        );

        reveal.onfinish = finishIntro;
        reveal.oncancel = finishIntro;
      };

      const tl = gsap.timeline({ onComplete: revealPage });

      // Prevent scrolling during intro
      document.body.style.overflow = 'hidden';

      // Set initial states
      gsap.set(containerRef.current, {
        clipPath:
          'polygon(0% 0%, 100% 0%, 100% 100%, 80% 100%, 80% 100%, 60% 100%, 60% 100%, 40% 100%, 40% 100%, 20% 100%, 20% 100%, 0% 100%)',
      });
      gsap.set(logoRef.current, { scale: 0.8, opacity: 0, y: 20 });
      gsap.set(titleRef.current, { opacity: 0, y: 25, letterSpacing: '0.15em' });
      gsap.set(subtitleRef.current, { opacity: 0, y: 15 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'center center' });

      tl.to(logoRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: 'power3.out',
        delay: 0.05,
      })
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            letterSpacing: '0.08em',
            duration: 0.4,
            ease: 'power3.out',
          },
          '-=0.2'
        )
        .to(
          lineRef.current,
          {
            scaleX: 1,
            duration: 0.25,
            ease: 'power2.inOut',
          },
          '-=0.25'
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          },
          '-=0.15'
        )
        .to(
          contentRef.current,
          {
            opacity: 0,
            y: -25,
            duration: 0.2,
            ease: 'power2.in',
            delay: 0.1,
          }
        );
    }, containerRef);

    // Never leave the page covered if a browser interrupts either animation.
    const completionFallback = window.setTimeout(finishIntro, 2600);

    return () => {
      window.clearTimeout(completionFallback);
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#0B2348] text-paper overflow-hidden select-none"
      style={{ willChange: 'clip-path, opacity' }}
      aria-label="Loading Proven Roofing"
    >
      {/* One charcoal cover retracts along a stepped diagonal, keeping the reveal continuous. */}

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-xl mx-auto"
      >
        {/* Animated 3D Logo */}
        <div
          ref={logoRef}
          className="relative w-20 h-20 sm:w-24 sm:h-24 bg-paper rounded-2xl shadow-2xl p-2.5 flex items-center justify-center mb-6 border border-[#FF773D]/40"
        >
          <Image
            src="/images/logo.png"
            alt="Proven Roofing"
            width={80}
            height={80}
            priority
            className="object-contain"
          />
        </div>

        {/* Primary Requested Uppercase Welcome Text */}
        <h1
          ref={titleRef}
          className="font-display text-22 sm:text-30 md:text-36 font-medium text-paper uppercase tracking-[0.08em] leading-tight mb-3 text-shadow-sm"
        >
          Proven Roofing
        </h1>

        {/* Delicate Golden-Lime Divider Line */}
        <div
          ref={lineRef}
          className="w-24 sm:w-32 h-[2px] bg-lime rounded-full mb-3"
        />

        {/* Subtitle / Location */}
        <p
          ref={subtitleRef}
          className="font-body text-12 sm:text-13 text-paper/85 uppercase tracking-[0.15em]"
        >
          Cork roofing contractor • Cork
        </p>
      </div>
    </div>
  );
}
