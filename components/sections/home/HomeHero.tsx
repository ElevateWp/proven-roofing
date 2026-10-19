'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CLINIC_INFO } from '@/lib/clinic-data';
import { isReducedMotion } from '@/lib/motion';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 300;
const FRAME_URL = (index: number) =>
  `/images/home-roof-sequence/frame-${String(index + 1).padStart(3, '0')}.jpg`;

const STORY = [
  {
    eyebrow: 'ROOF REPAIRS · CORK',
    title: 'Noticed a leak or damaged roof?',
    text: 'Small roofing problems can grow over time. Tell Michael and the team what you have noticed and ask about a free estimate.',
  },
  {
    eyebrow: 'FLAT ROOFING',
    title: 'Ready to refresh an ageing roof?',
    text: 'Explore roof tiling, flat roofing and repair work planned around your property.',
  },
  {
    eyebrow: 'GUTTERING',
    title: 'Is water not draining where it should?',
    text: 'Guttering, downpipes, soffit and fascia work for homes and properties across Cork.',
  },
  {
    eyebrow: 'NEW ROOFS',
    title: 'Considering a new roof?',
    text: 'Discuss new roof options, materials and project scope with our local team.',
  },
  {
    eyebrow: 'DRY VERGES · ROOFING · REPAIRS',
    title: 'Need help with a roof detail?',
    text: 'We work on roof valleys, skylights, chimneys, flashing and dry verges.',
  },
  {
    eyebrow: 'PROVEN ROOFING · CORK',
    title: 'Let’s talk about your roof.',
    text: 'Call Michael and the team to discuss roof repairs, flat roofing, new roofs or guttering in Cork.',
  },
];

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const frameRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: false });
    if (!section || !canvas || !context) return;

    let disposed = false;
    let desiredFrame = 0;
    const loaded = new Map<number, HTMLImageElement>();
    const pending = new Map<number, HTMLImageElement>();

    const drawFrame = (index: number) => {
      const image = loaded.get(index);
      if (!image || disposed) return;
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.round(bounds.width * dpr);
      const height = Math.round(bounds.height * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      context.clearRect(0, 0, width, height);
      context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
    };

    const loadFrame = (index: number) => {
      if (index < 0 || index >= FRAME_COUNT || loaded.has(index) || pending.has(index)) return;
      const image = new Image();
      image.decoding = 'async';
      pending.set(index, image);
      image.onload = () => {
        pending.delete(index);
        if (disposed) return;
        loaded.set(index, image);
        if (loaded.size > 20) {
          let oldest: number | undefined;
          loaded.forEach((_, key) => {
            if (oldest === undefined && Math.abs(key - desiredFrame) > 10 && key !== index) oldest = key;
          });
          if (oldest !== undefined) loaded.delete(oldest);
        }
        if (index === desiredFrame) drawFrame(index);
      };
      image.onerror = () => pending.delete(index);
      image.src = FRAME_URL(index);
    };

    const showFrame = (index: number) => {
      desiredFrame = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(index)));
      frameRef.current = desiredFrame;
      loadFrame(desiredFrame);
      if (loaded.has(desiredFrame)) drawFrame(desiredFrame);
      // Keep a short buffer ahead of the playhead so the sequence stays fluid.
      for (let offset = 1; offset <= 6; offset += 1) loadFrame(desiredFrame + offset);
    };

    const resizeObserver = new ResizeObserver(() => showFrame(frameRef.current));
    resizeObserver.observe(canvas);
    showFrame(0);

    const reducedMotion = isReducedMotion();
    const panels = panelsRef.current.filter((panel): panel is HTMLDivElement => panel !== null);
    const siteHeader = document.querySelector<HTMLElement>('[data-site-header]');
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(panels, { autoAlpha: 0, x: 0 });
        gsap.set(panels[0], { autoAlpha: 1 });
        return;
      }

      gsap.set(panels, { autoAlpha: 0, x: 0 });
      gsap.set(panels[0], { autoAlpha: 1 });

      const hideHeader = () => {
        if (!siteHeader) return;
        gsap.to(siteHeader, {
          autoAlpha: 0,
          y: -14,
          duration: 0.55,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };
      const showHeader = () => {
        if (!siteHeader) return;
        gsap.to(siteHeader, {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      const story = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${window.innerHeight * STORY.length}`,
          pin: true,
          // The homepage is a flex column, where ScrollTrigger otherwise disables pin spacing by default.
          pinSpacing: true,
          scrub: 1.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: hideHeader,
          onEnterBack: hideHeader,
          onLeave: showHeader,
          onLeaveBack: showHeader,
        },
      });

      const playhead = { frame: 0 };
      story.to(playhead, {
        frame: FRAME_COUNT - 1,
        duration: STORY.length,
        ease: 'none',
        onUpdate: () => showFrame(playhead.frame),
      }, 0);

      STORY.forEach((_, index) => {
        if (index === 0) return;
        const previous = panels[index - 1];
        const current = panels[index];
        const enterFrom = index % 2 === 1 ? -52 : 52;
        const leaveTo = index % 2 === 1 ? 34 : -34;
        story.to(previous, {
          autoAlpha: 0,
          x: leaveTo,
          y: -10,
          scale: 0.99,
          duration: 0.58,
          ease: 'power2.inOut',
        }, index - 0.18);
        story.fromTo(current,
          { autoAlpha: 0, x: enterFrom, y: 14, scale: 0.985 },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.72,
            ease: 'power3.out',
          },
          index - 0.08
        );
      });
    }, section);

    return () => {
      disposed = true;
      resizeObserver.disconnect();
      ctx.revert();
      loaded.clear();
      pending.clear();
    };
  }, []);

  const phone = CLINIC_INFO.contact.phone;
  const phoneLink = `tel:${phone.replace(/[^0-9+]/g, '')}`;

  return (
    <section
      ref={sectionRef}
      aria-label="Roofing services in Cork"
      className="relative z-30 isolate h-[100svh] min-h-[620px] w-full shrink-0 overflow-hidden bg-[#0B2348] text-white"
    >
      <canvas
        ref={canvasRef}
        aria-label="A sequence showing roof construction work"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[#0B2348]/45" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#0B2348]/80 via-[#0B2348]/25 to-[#0B2348]/55"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B2348]/55 via-transparent to-[#0B2348]/15" aria-hidden="true" />

      <div className="relative z-10 h-full w-full">
        {STORY.map((item, index) => {
          const isRight = index % 2 === 1;
          const Heading = index === 0 ? 'h1' : 'h2';
          return (
            <div
              key={item.eyebrow}
              ref={(element) => { panelsRef.current[index] = element; }}
              className={`absolute inset-0 flex items-center px-6 sm:px-10 lg:px-[9vw] ${isRight ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`w-full max-w-[620px] ${isRight ? 'text-right' : 'text-left'}`}>
                <p className="mb-5 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75 sm:text-xs">
                  {item.eyebrow}
                </p>
                <Heading className="mb-5 font-display text-4xl font-normal leading-[1.04] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl lg:text-[clamp(3.5rem,6.4vw,6rem)]">
                  {item.title}
                </Heading>
                <p className={`max-w-[540px] text-base leading-relaxed text-white/80 sm:text-lg ${isRight ? 'ml-auto' : ''}`}>
                  {item.text}
                </p>
                {index === STORY.length - 1 && (
                  <div className={`mt-8 flex flex-wrap gap-3 ${isRight ? 'justify-end' : 'justify-start'}`}>
                    <a
                      href={phoneLink}
                      className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-[#172C4D] transition-colors hover:bg-[#FCE5D9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    >
                      Call {phone}
                    </a>
                    <a
                      href="/request-a-quote/"
                      className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/65 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    >
                      Request a quote
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pointer-events-none absolute bottom-7 left-6 right-6 z-20 flex flex-col items-start gap-2 font-body text-[10px] uppercase tracking-[0.16em] text-white/70 sm:flex-row sm:items-center sm:justify-between sm:left-10 sm:right-10 lg:left-[9vw] lg:right-[9vw]">
        <span>Proven Roofing · Cork</span>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
