import React from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import AnimateOnScroll from '@/components/motion/AnimateOnScroll';

const REVIEWS = [
  { name: 'Neney Dooley', quote: 'Exceptional service from Michael. He initially quoted me to replace my skylight in January this year on my property in Douglas, Cork. I called back last week and the price has not increased. I’m very grateful he …' },
  { name: 'TTVSebastian2019 Havlik', quote: 'Very good company.' },
  { name: 'Макар Ясеницький', quote: 'Did a decent job on my flat roof in Rochestown, Cork. Highly recommended.' },
];

export default function HomeReviews() {
  return (
    <section className="w-full bg-paper-secondary py-20 md:py-28 border-t border-mist">
      <div className="max-w-site mx-auto px-6 md:px-12">
        <AnimateOnScroll animation="fade-up" duration={0.8} className="mb-12 text-center">
          <span className="font-body text-13 text-forest-light block mb-2 font-medium uppercase tracking-wider">
            Customer feedback
          </span>
          <h2 className="font-display text-33 md:text-41 text-forest-ink">
            What customers say
          </h2>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REVIEWS.map((review, index) => (
            <AnimateOnScroll key={review.name} animation="fade-up" delay={index * 0.1} duration={0.8}>
              <article className="h-full bg-paper border border-mist p-6 md:p-7 shadow-sm">
                <div className="flex gap-1 mb-4 text-brand" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, star) => <Star key={star} size={15} fill="currentColor" strokeWidth={1.5} />)}
                </div>
                <blockquote className="font-body text-15 text-forest-ink/85 leading-relaxed mb-6">
                  “{review.quote}”
                </blockquote>
                <div className="border-t border-mist pt-4 flex items-center justify-between gap-3">
                  <span className="font-body text-13 font-semibold text-forest-ink">{review.name}</span>
                  <span className="font-body text-12 text-forest-light">Google review</span>
                </div>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
        <div className="mt-9 text-center">
          <Link
            href="/testimonials/"
            className="inline-flex items-center gap-2 font-body text-15 font-semibold text-forest hover:text-forest-light underline underline-offset-4 transition-colors"
          >
            Read all testimonials <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
