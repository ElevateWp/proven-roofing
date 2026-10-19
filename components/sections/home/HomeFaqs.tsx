import React from 'react';
import Accordion, { AccordionItem } from '@/components/ui/Accordion';
import JsonLd from '@/components/ui/JsonLd';
import { generateFaqSchema } from '@/lib/seo';
import AnimateOnScroll from '@/components/motion/AnimateOnScroll';
import { CLINIC_INFO } from '@/lib/clinic-data';

const HOME_FAQS: AccordionItem[] = [
  {
    question: 'What roofing services do you provide?',
    answer: 'Roof repairs, new roofs, flat roofing, roof tiling, skylights, chimneys, flashing, guttering and roofline services.',
    relatedLink: { href: '/services/', label: 'Explore our services →' },
  },
  {
    question: 'Do you cover my area?',
    answer: 'Proven Roofing is based in Cork, Ireland. Contact the team to discuss your property.',
    relatedLink: { href: '/contact/', label: 'Contact our team →' },
  },
  {
    question: 'Can you help with guttering and roofline work?',
    answer: 'Yes. Our services include gutter repairs and installation, downpipes, soffit and fascia.',
    relatedLink: { href: '/guttering-installations/', label: 'Explore guttering →' },
  },
  {
    question: 'How do I request a quote?',
    answer: `Call us on ${CLINIC_INFO.contact.phone} or send a message through our quote request form.`,
    relatedLink: { href: '/request-a-quote/', label: 'Request a quote →' },
  },
  {
    question: 'Where is Proven Roofing based?',
    answer: CLINIC_INFO.primaryLocation.directions,
    relatedLink: { href: '/contact/', label: 'Check our service area →' },
  },
];

export default function HomeFaqs() {
  return (
    <section className="relative z-20 w-full bg-paper py-20 md:py-32 border-t border-mist overflow-hidden">
      <JsonLd data={generateFaqSchema(HOME_FAQS)} />
      <div className="max-w-site mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <AnimateOnScroll animation="fade-right" duration={0.85} className="lg:col-span-5">
            <span className="font-body text-13 text-forest-ink/60 block mb-2 font-medium uppercase tracking-wider">
              Frequently Asked Questions
            </span>
            <h2 className="font-display text-33 md:text-41 text-forest-ink mb-6">
              Questions about your roofing project
            </h2>
            <p className="font-body text-15 md:text-17 text-forest-ink/80 leading-relaxed mb-6">
                Clear answers about roofing services, free estimates and our Cork location.
            </p>
            <div className="p-6 bg-mist/40 border border-mist">
              <span className="font-body text-13 text-forest font-medium block mb-1">
                Have another question?
              </span>
              <p className="font-body text-13 text-forest-ink/70 mb-3">
                Call or message our team and we will be happy to help.
              </p>
              <a
                href={`tel:${CLINIC_INFO.contact.phone.replace(/[^0-9+]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-13 text-forest font-medium underline underline-offset-4"
              >
                Call our team
              </a>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-left" duration={0.85} className="lg:col-span-7">
            <Accordion items={HOME_FAQS} />
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
