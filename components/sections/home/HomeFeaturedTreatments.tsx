import React from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import AnimateOnScroll from '@/components/motion/AnimateOnScroll';

export default function HomeFeaturedTreatments() {
  return (
    <section className="relative z-20 w-full bg-paper py-20 md:py-32 border-t border-mist overflow-hidden">
      <div className="max-w-site mx-auto px-6 md:px-12">
        <AnimateOnScroll animation="fade-up" duration={0.8} className="mb-16">
          <span className="font-body text-13 text-[#172C4D] block mb-2 font-medium uppercase tracking-wider">Roof Repairs & New Roofs</span>
          <h2 className="font-display text-33 md:text-41 text-[#172C4D]">Local roofing work for Cork properties</h2>
        </AnimateOnScroll>
        <div className="flex flex-col space-y-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <AnimateOnScroll animation="fade-right" duration={0.9} className="lg:col-span-6 order-2 lg:order-1">
              <span className="font-body text-13 text-[#172C4D] uppercase tracking-wider block mb-2 font-medium">Roof repairs</span>
              <h3 className="font-display text-26 md:text-33 text-[#172C4D] mb-4">Get help with a roof repair</h3>
              <p className="font-body text-15 md:text-17 text-[#172C4D]/80 leading-relaxed mb-6">Tell us what you have noticed, from leaks to damaged tiles, and we can discuss suitable repair work. Free estimates are available.</p>
              <div className="p-4 bg-[#F4F8FC] border-l-4 border-[#172C4D] mb-6 rounded-sm"><span className="font-body text-13 text-[#172C4D]/80"><strong className="text-[#172C4D] font-semibold">Discuss your project:</strong> The work, materials and timing are agreed with you before starting.</span></div>
              <Button href="/roof-repairs/" variant="ghost" size="md">Explore Roof Repairs</Button>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-left" duration={0.9} className="lg:col-span-6 order-1 lg:order-2">
              <div className="relative aspect-[4/3] bg-mist overflow-hidden border border-mist shadow-sm"><Image src="/images/jsroof-stock-06.jpg" alt="Illustrative roof repair" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-top" /></div>
            </AnimateOnScroll>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <AnimateOnScroll animation="fade-right" duration={0.9} className="lg:col-span-6"><div className="relative aspect-[4/3] bg-mist overflow-hidden border border-mist shadow-sm"><Image src="/images/jsroof-stock-07.jpg" alt="Illustrative residential roofing" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div></AnimateOnScroll>
            <AnimateOnScroll animation="fade-left" duration={0.9} className="lg:col-span-6">
              <span className="font-body text-13 text-[#172C4D] uppercase tracking-wider block mb-2 font-medium">New roofs</span>
              <h3 className="font-display text-26 md:text-33 text-[#172C4D] mb-4">Planning a new roof</h3>
              <p className="font-body text-15 md:text-17 text-[#172C4D]/80 leading-relaxed mb-6">Discuss your property, roof requirements and materials with Proven Roofing before agreeing the project scope.</p>
              <div className="p-4 bg-[#F4F8FC] border-l-4 border-[#172C4D] mb-6 rounded-sm"><span className="font-body text-13 text-[#172C4D]/80"><strong className="text-[#172C4D] font-semibold">A clear plan:</strong> Agree the quote and timing before the work begins.</span></div>
              <Button href="/new-roofs/" variant="ghost" size="md">Explore New Roofs</Button>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
