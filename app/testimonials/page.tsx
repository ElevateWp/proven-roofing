import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Star } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import TextureBackground from '@/components/layout/TextureBackground';
import AnimateOnScroll from '@/components/motion/AnimateOnScroll';
import WordRevealH1 from '@/components/motion/WordRevealH1';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Customer Testimonials',
  description:
    'Read positive customer feedback about roofing and guttering work by Proven Roofing in Cork.',
  pathname: '/testimonials/',
});

const TESTIMONIALS = [
  { name: 'Neney Dooley', quote: 'Exceptional service from Michael. He initially quoted me to replace my skylight in January this year on my property in Douglas, Cork. I called back last week and the price has not increased. I’m very grateful he …' },
  { name: 'TTVSebastian2019 Havlik', quote: 'Very good company.' },
  { name: 'Макар Ясеницький', quote: 'Did a decent job on my flat roof in Rochestown, Cork. Highly recommended.' },
];

function ReviewStars() {
  return (
    <div className="flex gap-1 text-brand" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} size={16} fill="currentColor" strokeWidth={1.5} />
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <div className="flex w-full flex-col bg-paper">
      <section className="relative overflow-hidden border-b border-mist py-16 md:py-24">
        <TextureBackground variant="blog" className="opacity-20" />
        <div className="relative z-10 mx-auto max-w-site px-6 md:px-12">
          <Breadcrumbs items={[{ name: 'Testimonials', path: '/testimonials/' }]} />
          <div className="mt-8 max-w-3xl">
            <AnimateOnScroll animation="fade-right" duration={0.8}>
              <span className="mb-3 block font-body text-13 font-medium uppercase tracking-wider text-forest-ink/60">
                Customer feedback
              </span>
              <WordRevealH1 text="What our customers say." />
              <p className="mt-6 max-w-2xl font-body text-17 leading-relaxed text-forest-ink/90 md:text-21">
                A selection of positive feedback shared by Proven Roofing customers.
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section className="border-b border-mist bg-paper-secondary py-16 md:py-24">
        <div className="mx-auto max-w-site px-6 md:px-12">
          <div className="mb-10 flex flex-col gap-4 border-b border-mist pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="mb-2 block font-body text-13 font-medium uppercase tracking-wider text-forest-light">
                Customer feedback
              </span>
              <h2 className="font-display text-26 text-forest-ink md:text-33">Reviews from our customers</h2>
            </div>
            <div className="border-l-2 border-greenAccent pl-4">
              <span className="block font-body text-13 font-medium uppercase tracking-wider text-forest-light">Proven Roofing</span>
              <span className="mt-1 block font-body text-12 text-forest-light">Cork, Ireland</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((review, index) => (
              <AnimateOnScroll key={`${review.name}-${index}`} animation="fade-up" delay={index * 0.08} duration={0.8}>
                <article className="h-full border border-mist bg-paper p-6 shadow-sm md:p-7">
                  <ReviewStars />
                  <blockquote className="mb-6 mt-4 font-body text-15 leading-relaxed text-forest-ink/85">
                    “{review.quote}”
                  </blockquote>
                  <div className="flex items-center justify-between gap-3 border-t border-mist pt-4">
                    <span className="font-body text-13 font-semibold text-forest-ink">{review.name}</span>
                    <span className="font-body text-12 text-forest-light">Google review</span>
                  </div>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest py-14 text-paper md:py-20">
        <div className="mx-auto flex max-w-site flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center md:px-12">
          <div>
            <span className="mb-2 block font-body text-13 font-semibold uppercase tracking-wider text-paper/65">
              Proven Roofing · Cork
            </span>
            <h2 className="font-display text-26 md:text-33">Need roofing work in Cork?</h2>
          </div>
          <Link
            href="/request-a-quote/"
            className="inline-flex min-h-12 items-center justify-center border border-paper bg-paper px-6 font-body text-15 font-semibold text-forest transition-colors hover:bg-[#FCE5D9]"
          >
            Request a quote
          </Link>
        </div>
      </section>
    </div>
  );
}
