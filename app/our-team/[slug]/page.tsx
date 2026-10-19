import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { DENTISTS, SERVICES, CLINIC_INFO } from '@/lib/clinic-data';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Button from '@/components/ui/Button';
import WordRevealH1 from '@/components/motion/WordRevealH1';
import ScrubbedParagraph from '@/components/motion/ScrubbedParagraph';
import AnimateOnScroll from '@/components/motion/AnimateOnScroll';
import JsonLd from '@/components/ui/JsonLd';
import { createMetadata } from '@/lib/seo';

interface DentistProfileProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return DENTISTS.map((dentist) => ({
    slug: dentist.slug,
  }));
}

export async function generateMetadata({ params }: DentistProfileProps): Promise<Metadata> {
  const dentist = DENTISTS.find((d) => d.slug === params.slug);
  if (!dentist) return {};

  return createMetadata({
    title: `${dentist.name} | ${dentist.title}`,
    description: dentist.bio,
    pathname: `/our-team/${dentist.slug}/`,
    image: dentist.image,
  });
}

export default function SingleDentistPage({ params }: DentistProfileProps) {
  const dentist = DENTISTS.find((d) => d.slug === params.slug);
  if (!dentist) notFound();

  const relatedServices = SERVICES.filter((s) => s.assignedDentistId === dentist.id);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: dentist.name,
    jobTitle: dentist.title,
    description: dentist.bio,
    image: dentist.image,
    worksFor: {
      '@type': 'LocalBusiness',
      name: CLINIC_INFO.name,
    },
    alumniOf: dentist.education.map((e) => ({
      '@type': 'EducationalOrganization',
      name: e,
    })),
    knowsAbout: dentist.specialties,
  };

  return (
    <div className="flex flex-col w-full bg-paper">
      <JsonLd data={personSchema} />

      {/* Header Profile Section */}
      <section className="py-16 md:py-24 border-b border-mist">
        <div className="max-w-site mx-auto px-6 md:px-12">
          <Breadcrumbs
            items={[
              { name: 'Proven Roofing team', path: '/our-team/' },
              { name: dentist.name, path: `/our-team/${dentist.slug}/` },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8 items-start">
            {/* Residential property reference image */}
            <div className="lg:col-span-5">
              <AnimateOnScroll animation="fade-right" duration={0.8}>
                <div className="relative aspect-[4/5] bg-mist overflow-hidden border border-mist shadow-sm">
                  <Image
                    src={dentist.image}
                    alt={`Photo of ${dentist.name}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-contain bg-paper p-5"
                  />
                </div>
                {dentist.experienceYears > 0 && <div className="mt-4 p-4 bg-mist/40 border border-mist flex justify-between text-13 font-body text-forest-ink/80">
                  <span>Business experience:</span>
                  <span className="font-medium text-forest">{dentist.experienceYears}+ years of experience</span>
                </div>}
              </AnimateOnScroll>
            </div>

            {/* Right: Biography & Titles */}
            <div className="lg:col-span-7">
              <AnimateOnScroll animation="fade-left" duration={0.8}>
                <span className="font-body text-13 text-forest-ink/60 block mb-2 font-medium uppercase tracking-wider">
                  {dentist.qualifications}
                </span>
                <WordRevealH1 text={dentist.name} className="mb-4" />
                <span className="font-display text-21 text-forest block mb-8">
                  {dentist.title}
                </span>

                <ScrubbedParagraph text={dentist.bio} className="mb-8" />

                <div className="p-6 bg-mist/30 border-l-2 border-forest mb-8 shadow-sm">
                  <span className="font-body text-13 text-forest font-medium uppercase tracking-wider block mb-2">
                    Our Approach
                  </span>
                  <p className="font-body text-15 text-forest-ink/90 leading-relaxed italic">
                    “{dentist.philosophy}”
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <Button href="/request-a-quote/" variant="forest" size="lg">
                    Request a quote from {dentist.name}
                  </Button>
                  <Button href="/our-team/" variant="ghost" size="lg">
                    Back to Our Team
                  </Button>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Credentials & Memberships */}
      {(dentist.education.length > 0 || dentist.memberships.length > 0) && <section className="py-20 md:py-32 border-b border-mist">
        <div className="max-w-site mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {dentist.education.length > 0 && <div className="lg:col-span-6">
              <AnimateOnScroll animation="fade-up" duration={0.8}>
                <h2 className="font-display text-26 md:text-33 text-forest-ink mb-6">
                  Experience and Specialties
                </h2>
                <ul className="space-y-4 font-body text-15 text-forest-ink/80">
                  {dentist.education.map((edu, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-4 border border-mist bg-paper shadow-sm">
                      <span className="text-forest font-bold mt-0.5">•</span>
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </AnimateOnScroll>
            </div>}

            {dentist.memberships.length > 0 && <div className="lg:col-span-6">
              <AnimateOnScroll animation="fade-up" duration={0.8} delay={0.15}>
                <h2 className="font-display text-26 md:text-33 text-forest-ink mb-6">
                  Team Information
                </h2>
                <ul className="space-y-4 font-body text-15 text-forest-ink/80">
                  {dentist.memberships.map((mem, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-4 border border-mist bg-paper shadow-sm">
                      <span className="text-forest font-bold mt-0.5">•</span>
                      <span>{mem}</span>
                    </li>
                  ))}
                </ul>
              </AnimateOnScroll>
            </div>}
          </div>
        </div>
      </section>}

      {/* Roofing services */}
      {relatedServices.length > 0 && (
        <section className="py-20 md:py-32 border-b border-mist">
          <div className="max-w-site mx-auto px-6 md:px-12">
            <AnimateOnScroll animation="fade-up" duration={0.8}>
              <div className="mb-12">
                <span className="font-body text-13 text-forest-ink/60 block mb-2 font-medium uppercase tracking-wider">
                  Areas of Work
                </span>
                <h2 className="font-display text-33 md:text-41 text-forest-ink">
                  Roofing services from {dentist.name}
                </h2>
              </div>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedServices.map((service) => (
                <AnimateOnScroll key={service.slug} animation="fade-up">
                  <div className="p-8 bg-paper border border-mist flex flex-col justify-between h-full shadow-sm hover:border-forest/50 transition-colors">
                    <div>
                      <h3 className="font-display text-21 text-forest-ink mb-3">
                        {service.name}
                      </h3>
                      <p className="font-body text-15 text-forest-ink/80 leading-relaxed mb-6">
                        {service.shortDescription}
                      </p>
                    </div>
                    <Link
                      href={`/${service.slug}/`}
                      className="font-body text-13 text-forest font-medium hover:underline inline-flex items-center gap-1"
                    >
                      View service details →
                    </Link>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Direct Scheduling CTA */}
      <section className="py-20 md:py-28 bg-forest text-paper">
        <div className="max-w-site mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <AnimateOnScroll animation="fade-right" duration={0.8}>
            <div>
              <span className="font-body text-13 text-lime uppercase tracking-wider block mb-2 font-medium">
                Request a Quote
              </span>
              <h2 className="font-display text-33 md:text-41 text-paper">
                Would you like to request a quote from {dentist.name}?
              </h2>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-left" duration={0.8} delay={0.2}>
            <Button href="/request-a-quote/" variant="lime" size="lg">
              Request a Quote
            </Button>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
