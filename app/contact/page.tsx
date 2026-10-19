import React from 'react';
import { Metadata } from 'next';
import { CLINIC_INFO } from '@/lib/clinic-data';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Button from '@/components/ui/Button';
import WordRevealH1 from '@/components/motion/WordRevealH1';
import TextureBackground from '@/components/layout/TextureBackground';
import AnimateOnScroll from '@/components/motion/AnimateOnScroll';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Contact and Service Area',
  description:
    'Contact Proven Roofing on +353 87 069 0272 about roof repairs, new roofs, flat roofing and guttering in Cork.',
  pathname: '/contact/',
});

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full bg-paper">
      {/* SECTION 1: Contact Introduction */}
      <section className="relative py-16 md:py-24 border-b border-mist overflow-hidden">
        <TextureBackground variant="Contato" className="opacity-30" />

        <div className="relative z-10 max-w-site mx-auto px-6 md:px-12">
          <Breadcrumbs items={[{ name: 'Contact', path: '/contact/' }]} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
            <div className="lg:col-span-8">
              <AnimateOnScroll animation="fade-right" duration={0.8}>
                <span className="font-body text-13 text-forest-ink/60 block mb-3 uppercase tracking-wider font-medium">
                  Contact & Quotes
                </span>
                <WordRevealH1 text="Talk to Michael and the team." />
                <p className="font-body text-17 md:text-21 text-forest-ink/90 leading-relaxed mt-6 max-w-2xl">
                  Call us to discuss roof repairs, flat roofing, new roofs or guttering.
                </p>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2-7: Contact Methods Directory, Hours, Address & Map */}
      <section className="py-20 md:py-32 border-b border-mist">
        <div className="max-w-site mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Direct Communication Channels List */}
            <div className="lg:col-span-6 flex flex-col space-y-8">
              <AnimateOnScroll animation="fade-right" duration={0.8}>
                <div>
                  <span className="font-body text-13 text-forest-ink/60 block mb-2 font-medium uppercase tracking-wider">
                    Get in Touch
                  </span>
                  <h2 className="font-display text-26 md:text-33 text-forest-ink mb-6">
                    Contact Us
                  </h2>
                  <a
                    href="/request-a-quote/"
                    className="mb-5 inline-flex min-h-11 items-center bg-brand px-5 font-body text-15 font-semibold text-white transition-colors hover:bg-brand-hover"
                  >
                    Request a quote
                  </a>

                  <div className="divide-y divide-mist border-t border-b border-mist">
                    {/* Call */}
                    <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-mist/30 px-4 -mx-4 rounded-sm">
                      <div>
                        <span className="font-body text-13 text-forest font-semibold block">Call our team</span>
                        <a
                          href={`tel:${CLINIC_INFO.contact.phone.replace(/[^0-9+]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-display text-21 text-forest font-bold hover:underline"
                        >
                          {CLINIC_INFO.contact.phone}
                        </a>
                      </div>
                      <span className="font-body text-13 text-forest font-medium">Roofing enquiries</span>
                    </div>

                    {/* Phone */}
                    <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="font-body text-13 text-forest-ink/60 block">Phone</span>
                        <a
                          href={`tel:${CLINIC_INFO.contact.phone.replace(/[^0-9+]/g, '')}`}
                          className="font-display text-21 text-forest hover:underline"
                        >
                          {CLINIC_INFO.contact.phone}
                        </a>
                      </div>
                      <span className="font-body text-13 text-forest-ink/60">Open 24 hours</span>
                    </div>

                    <div className="py-5">
                      <span className="font-body text-13 text-forest-ink/60 block">Website</span>
                      <a href={CLINIC_INFO.contact.website} className="font-display text-21 text-forest break-all hover:underline" target="_blank" rel="noopener noreferrer">
                        provenroofing.ie
                      </a>
                    </div>

                  </div>
                </div>
              </AnimateOnScroll>

              {/* Business address and directions */}
              <AnimateOnScroll animation="fade-up" duration={0.8} delay={0.2}>
                <div>
                  <span className="font-body text-13 text-forest-ink/60 block mb-2 font-medium uppercase tracking-wider">
                    Service Area
                  </span>
                  <h3 className="font-display text-21 text-forest-ink mb-3">
                    {CLINIC_INFO.name}
                  </h3>
                  <address className="not-italic font-body text-15 text-forest-ink/90 leading-relaxed mb-4">
                    {CLINIC_INFO.primaryLocation.directions}
                  </address>
                  <div className="p-4 bg-mist/40 border-l-2 border-forest font-body text-13 text-forest-ink/80 leading-relaxed">
                    <strong>Address:</strong> {CLINIC_INFO.primaryLocation.directions}
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Right: Opening Hours Table & Stylized Palette Map */}
            <div className="lg:col-span-6 flex flex-col space-y-8">
              <AnimateOnScroll animation="fade-left" duration={0.8}>
                <div>
                  <span className="font-body text-13 text-forest-ink/60 block mb-2 font-medium uppercase tracking-wider">
                    Opening Hours
                  </span>
                  <div className="border border-mist divide-y divide-mist bg-paper font-body text-13 shadow-sm">
                    {CLINIC_INFO.schedule.length > 0 ? CLINIC_INFO.schedule.map((item) => (
                      <div key={item.day} className="p-3.5 flex justify-between">
                        <span className="font-medium text-forest-ink">{item.day}</span>
                        <span className="tabular-nums text-forest-ink/80">{item.hours}</span>
                      </div>
                    )) : <p className="p-3.5 text-forest-ink/80">Please call to confirm current availability.</p>}
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Stylized Palette Map */}
              <AnimateOnScroll animation="zoom-in" duration={0.8} delay={0.2}>
                <div className="p-8 bg-forest text-paper flex flex-col justify-between aspect-[16/10] shadow-sm">
                  <div>
                    <span className="font-body text-13 text-lime block mb-2 font-medium uppercase tracking-wider">
                      Service Area
                    </span>
                    <h3 className="font-display text-26 text-paper mb-2">
                      {CLINIC_INFO.name}
                    </h3>
                    <p className="font-body text-13 text-paper/80 leading-relaxed">
                      {CLINIC_INFO.primaryLocation.directions}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-mist/20 flex flex-wrap items-center justify-between gap-4">
                    <Button
                      href={`tel:${CLINIC_INFO.contact.phone.replace(/[^0-9+]/g, '')}`}
                      variant="lime"
                      size="sm"
                    >
                      Call our team
                    </Button>
                    <a
                      href={`tel:${CLINIC_INFO.contact.phone.replace(/[^0-9+]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-13 text-lime hover:underline font-semibold"
                    >
                      Call: {CLINIC_INFO.contact.phone}
                    </a>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: Final Contact / Appointment CTA */}
      <section className="py-20 md:py-28 bg-forest text-paper">
        <div className="max-w-site mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <AnimateOnScroll animation="fade-right" duration={0.8}>
            <div>
              <span className="font-body text-13 text-lime uppercase tracking-wider block mb-2 font-medium">
                Roofing Quote
              </span>
              <h2 className="font-display text-33 md:text-41 text-paper">
                Ready to request a quote?
              </h2>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-left" duration={0.8} delay={0.2}>
            <Button href="/request-a-quote/" variant="lime" size="lg">
              Request a Quote Online
            </Button>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
