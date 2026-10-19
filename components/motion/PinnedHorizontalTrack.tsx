'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion } from '@/lib/motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface HorizontalTrackItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  image?: string;
  theme?: 'paper' | 'forest';
}

interface PinnedHorizontalTrackProps {
  items: HorizontalTrackItem[];
  title?: string;
  className?: string;
}

export default function PinnedHorizontalTrack({
  items,
  title = 'Roofing Services',
  className = '',
}: PinnedHorizontalTrackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      // Keep touch-first horizontal scrolling on tablets, including landscape iPads.
      setIsDesktop(window.innerWidth >= 1280);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  useEffect(() => {
    if (isReducedMotion() || !containerRef.current || !trackRef.current || !isDesktop) {
      return;
    }

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        return trackWidth - viewportWidth + (window.innerWidth >= 1280 ? 120 : 60);
      };

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          scrub: 1,
          onUpdate: (self) => {
            if (progressRef.current) {
              gsap.set(progressRef.current, { width: `${Math.max(15, self.progress * 100)}%` });
            }
            const current = Math.min(
              items.length,
              Math.floor(self.progress * items.length) + 1
            );
            setCurrentIndex(current);
          },
        },
      });

      return () => {
        tween.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, [items, isDesktop]);

  return (
    <section
      ref={containerRef}
      className={`relative w-full overflow-x-clip bg-paper py-12 md:py-16 lg:py-20 z-10 ${className}`}
    >
      {/* Header bar with counter & progress rule */}
      <div className="max-w-site mx-auto px-6 md:px-12 mb-8 md:mb-12 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="font-body text-13 text-forest-ink/60 block mb-2">{title}</span>
          <h2 className="font-display text-26 sm:text-33 md:text-41 text-forest-ink leading-tight">
            Roofing for Every Part of Your Home
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-body text-13 tabular-nums text-forest-ink">
            <span className="font-medium text-forest">{currentIndex}</span>
            <span className="text-forest-ink/40"> of </span>
            <span>{items.length}</span>
          </span>
          <div className="w-24 sm:w-32 h-[2px] bg-mist relative overflow-hidden hidden sm:block">
            <div
              ref={progressRef}
              className="absolute left-0 top-0 bottom-0 bg-forest transition-all duration-75"
              style={{ width: `${(1 / items.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Horizontal Track: GSAP scroll on desktop / native touch scroll on mobile+tablet */}
      <div
        ref={scrollContainerRef}
        onScroll={(event) => {
          if (isDesktop) return;
          const viewport = event.currentTarget;
          const cards = Array.from(trackRef.current?.children ?? []) as HTMLElement[];
          if (!cards.length) return;

          const viewportCenter = viewport.getBoundingClientRect().left + viewport.clientWidth / 2;
          let closestIndex = 0;
          let closestDistance = Number.POSITIVE_INFINITY;
          cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const distance = Math.abs(rect.left + rect.width / 2 - viewportCenter);
            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = index;
            }
          });
          setCurrentIndex((current) => current === closestIndex + 1 ? current : closestIndex + 1);
        }}
        className="w-full overflow-x-auto xl:overflow-x-visible pb-2 xl:pb-0 scrollbar-none"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div
          ref={trackRef}
          className="flex flex-row gap-4 sm:gap-6 px-6 md:px-12 w-max pb-4 lg:pb-0 snap-x snap-mandatory lg:snap-none will-change-transform"
        >
          {items.map((item, idx) => {
            const isForest = item.theme === 'forest' || idx % 2 === 1;
            return (
              <div
                key={item.id}
                className={`w-[82vw] sm:w-[400px] lg:w-[480px] xl:w-[520px] flex-shrink-0 snap-center flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12 transition-colors duration-300 border border-mist ${
                  isForest ? 'bg-forest text-paper' : 'bg-paper text-forest-ink'
                }`}
              >
                <div>
                  <span
                    className={`font-body text-13 block mb-3 md:mb-4 ${
                      isForest ? 'text-paper/60' : 'text-forest-ink/60'
                    }`}
                  >
                    {item.subtitle}
                  </span>
                  <h3
                    className={`font-display text-21 sm:text-26 md:text-33 mb-3 md:mb-4 leading-snug ${
                      isForest ? 'text-paper' : 'text-forest-ink'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`font-body text-15 md:text-17 leading-relaxed mb-6 md:mb-8 ${
                      isForest ? 'text-paper/80' : 'text-forest-ink/80'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-mist/30 flex items-center justify-between">
                  <Link
                    href={item.href}
                    className={`inline-flex items-center gap-2 font-body text-15 font-medium transition-all ${
                      isForest
                        ? 'text-paper hover:text-lime'
                        : 'text-forest hover:text-forest-light'
                    }`}
                  >
                    <span>Explore Service →</span>
                  </Link>
                  <span
                    className={`font-body text-13 tabular-nums ${
                      isForest ? 'text-paper/40' : 'text-forest-ink/40'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile swipe hint — only visible on mobile */}
      <div className="flex lg:hidden justify-center mt-4 gap-1.5 px-6" role="group" aria-label="Choose a service">
        {items.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Go to slide ${idx + 1}: ${item.title}`}
            aria-current={idx === currentIndex - 1 ? 'true' : undefined}
            onClick={() => {
              const viewport = scrollContainerRef.current;
              const card = trackRef.current?.children[idx] as HTMLElement | undefined;
              if (!viewport || !card) return;

              const cardRect = card.getBoundingClientRect();
              const viewportRect = viewport.getBoundingClientRect();
              const targetLeft = viewport.scrollLeft + cardRect.left - viewportRect.left + cardRect.width / 2 - viewport.clientWidth / 2;
              viewport.scrollTo({ left: Math.max(0, Math.min(targetLeft, viewport.scrollWidth - viewport.clientWidth)), behavior: 'smooth' });
              setCurrentIndex(idx + 1);
            }}
            className={`h-3 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${
              idx === currentIndex - 1 ? 'bg-[#172C4D] w-4' : 'bg-[#DCE5EF] w-3'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
