import React from 'react';
import { Metadata } from 'next';
import { CLINIC_INFO } from '@/lib/clinic-data';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import BookingForm from '@/components/sections/booking/BookingForm';
import WordRevealH1 from '@/components/motion/WordRevealH1';
import ScrubbedParagraph from '@/components/motion/ScrubbedParagraph';
import AnimateOnScroll from '@/components/motion/AnimateOnScroll';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Request a Roofing Quote',
  description:
    'Request a free estimate for roof repairs, new roofs, flat roofing or guttering from Proven Roofing in Cork.',
  pathname: '/request-a-quote/',
});

const BOOKING_STEPS = [
  {
    step: 1,
    title: 'Send Your Request',
    description: 'Tell us about your roofing project and how you would like us to contact you.',
  },
  {
    step: 2,
    title: 'Team Review',
    description: 'Our team reviews your enquiry and discusses availability and next steps.',
  },
  {
    step: 3,
    title: 'We Get in Touch',
    description: 'We contact you to discuss your request and arrange an assessment.',
  },
  {
    step: 4,
    title: 'Roofing Work',
    description: 'Michael and the team complete the agreed roofing work at your property.',
  },
];

export default function BookAppointmentPage() {
  return (
    <div className="flex flex-col w-full bg-paper">
      {/* SECTION 1: Appointment Introduction */}
      <section className="py-16 md:py-24 border-b border-mist">
        <div className="max-w-site mx-auto px-6 md:px-12">
          <Breadcrumbs items={[{ name: 'Request a Quote', path: '/request-a-quote/' }]} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8 items-start">
            <div className="lg:col-span-8">
              <AnimateOnScroll animation="fade-right" duration={0.8}>
                <span className="font-body text-13 text-forest-ink/60 block mb-3 uppercase tracking-wider font-medium">
                  Personal Service
                </span>
                <WordRevealH1 text="Request a roofing quote." />
                <div className="mt-8">
                  <ScrubbedParagraph text="Tell us about your roof repairs, new roof, flat roof or guttering project in Cork." />
                </div>
              </AnimateOnScroll>
            </div>

            <div className="lg:col-span-4 lg:pl-6">
              <AnimateOnScroll animation="fade-left" duration={0.8} delay={0.2}>
                <div className="p-6 bg-paper border border-mist space-y-3 font-body text-13 text-forest-ink/80 shadow-sm">
                  <span className="font-medium text-forest block">Call our team:</span>
                  <p className="text-forest-ink/70">
                    Prefer to speak with us directly? Call any time.
                  </p>
                  <a
                    href={`tel:${CLINIC_INFO.contact.phone.replace(/[^0-9+]/g, '')}`}
                    className="font-display text-17 text-forest font-semibold block hover:underline"
                  >
                    {CLINIC_INFO.contact.phone}
                  </a>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 & 3: Interactive Form & 4-Step Process Explanation */}
      <section className="py-20 md:py-32 border-b border-mist">
        <div className="max-w-site mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: 4-Step Sequential Process */}
            <div className="lg:col-span-5 flex flex-col space-y-8">
              <AnimateOnScroll animation="fade-right" duration={0.8}>
                <div>
                  <span className="font-body text-13 text-forest-ink/60 block mb-2 font-medium uppercase tracking-wider">
                    How It Works
                  </span>
                  <h2 className="font-display text-26 md:text-33 text-forest-ink mb-4">
                    What Happens Next
                  </h2>
                  <p className="font-body text-15 text-forest-ink/80 leading-relaxed mb-6">
                    We take time to understand your plans and explain the next steps clearly.
                  </p>
                </div>
              </AnimateOnScroll>

              {/* Numbered Step Sequence */}
              <div className="space-y-6">
                {BOOKING_STEPS.map((step, idx) => (
                  <AnimateOnScroll key={step.step} animation="fade-up" delay={idx * 0.1}>
                    <div className="flex items-start gap-4 p-4 bg-paper border border-mist shadow-sm">
                      <span className="w-8 h-8 rounded-full bg-forest text-paper flex items-center justify-center font-display text-15 flex-shrink-0">
                        {step.step}
                      </span>
                      <div>
                        <h3 className="font-display text-17 text-forest-ink mb-1">
                          {step.title}
                        </h3>
                        <p className="font-body text-13 text-forest-ink/70 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>

            {/* Right: Interactive Form with in-place confirmation */}
            <div className="lg:col-span-7">
              <AnimateOnScroll animation="fade-left" duration={0.8} delay={0.15}>
                <BookingForm />
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4, 5, 6: Contact Options, Opening Hours, Service Area */}
      <section className="py-20 md:py-32 border-b border-mist">
        <div className="max-w-site mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Options */}
            <AnimateOnScroll animation="fade-up" delay={0.1}>
              <div className="p-8 bg-paper border border-mist h-full shadow-sm">
                <span className="font-body text-13 text-forest block mb-2 font-medium uppercase tracking-wider">Contact</span>
                <h3 className="font-display text-21 text-forest-ink mb-4">Talk to Our Team</h3>
                <div className="space-y-3 font-body text-13 text-forest-ink/80">
                  <div>
                    <span className="text-forest-ink/60 block">Phone:</span>
                    <a href={`tel:${CLINIC_INFO.contact.phone.replace(/[^0-9+]/g, '')}`} className="font-medium text-forest hover:underline">
                      {CLINIC_INFO.contact.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-forest-ink/60 block">Phone:</span>
                    <a href={`tel:${CLINIC_INFO.contact.phone.replace(/[^0-9+]/g, '')}`} className="font-medium text-forest hover:underline">
                      {CLINIC_INFO.contact.phone}
                    </a>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Opening Hours */}
            <AnimateOnScroll animation="fade-up" delay={0.2}>
              <div className="p-8 bg-paper border border-mist h-full shadow-sm">
                <span className="font-body text-13 text-forest block mb-2 font-medium uppercase tracking-wider">Hours</span>
                <h3 className="font-display text-21 text-forest-ink mb-4">Opening Hours</h3>
                <div className="space-y-1.5 font-body text-13 text-forest-ink/80">
                  {CLINIC_INFO.schedule.length > 0 ? CLINIC_INFO.schedule.map((item) => (
                    <div key={item.day} className="flex justify-between">
                      <span>{item.day}</span>
                      <span className="tabular-nums">{item.hours}</span>
                    </div>
                  )) : <p>Please call to confirm current opening hours.</p>}
                </div>
              </div>
            </AnimateOnScroll>

            {/* Service Area */}
            <AnimateOnScroll animation="fade-up" delay={0.3}>
              <div className="p-8 bg-paper border border-mist h-full shadow-sm">
                <span className="font-body text-13 text-forest block mb-2 font-medium uppercase tracking-wider">Location</span>
                <h3 className="font-display text-21 text-forest-ink mb-4">Service Area</h3>
                <p className="font-body text-13 text-forest-ink/80 leading-relaxed mb-3">
                  We serve Cork and surrounding areas. Contact us to confirm availability for your property.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}
