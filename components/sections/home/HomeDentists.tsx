import React from 'react';
import Link from 'next/link';
import { DENTISTS } from '@/lib/clinic-data';
import DentistCard from '@/components/sections/dentists/DentistCard';
import AnimateOnScroll from '@/components/motion/AnimateOnScroll';

export default function HomeDentists() {
  return (
    <section className="relative z-20 w-full bg-paper py-20 md:py-32 border-t border-mist">
      <div className="max-w-site mx-auto px-6 md:px-12">
        <AnimateOnScroll animation="fade-up" duration={0.8}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="font-body text-13 text-forest-ink/60 block mb-2 font-medium uppercase tracking-wider">
                Our Team
              </span>
              <h2 className="font-display text-33 md:text-41 text-forest-ink">
                Meet Michael and the team
              </h2>
            </div>
            <Link
              href="/our-team/"
              className="font-body text-15 text-forest font-medium hover:underline underline-offset-4"
            >
              Meet the Team →
            </Link>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 max-w-sm mx-auto">
          {DENTISTS.map((dentist, idx) => (
            <DentistCard
              key={dentist.id}
              dentist={dentist}
              offsetY={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
