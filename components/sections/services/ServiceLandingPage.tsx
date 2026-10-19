import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import AnimateOnScroll from '@/components/motion/AnimateOnScroll';
import WordRevealH1 from '@/components/motion/WordRevealH1';
import Button from '@/components/ui/Button';
import Accordion from '@/components/ui/Accordion';
import JsonLd from '@/components/ui/JsonLd';
import { CLINIC_INFO, SERVICES } from '@/lib/clinic-data';
import { createMetadata, generateMedicalProcedureSchema } from '@/lib/seo';

const RELATED_SERVICE_SLUGS: Record<string, string[]> = {
  'new-roofs': ['roof-repairs', 'flat-roofing', 'roof-skylights'],
  'roof-repairs': ['roof-skylights', 'roof-flashing', 'flat-roofing'],
  'flat-roofing': ['new-roofs', 'roof-skylights', 'guttering-installations'],
  'roof-tiling': ['roof-valleys', 'chimneys', 'guttering-installations'],
  'roof-valleys': ['roof-tiling', 'roof-repairs', 'roof-skylights'],
  'roof-skylights': ['roof-repairs', 'flat-roofing', 'guttering-installations'],
  'guttering-installations': ['roof-repairs', 'flat-roofing', 'roof-skylights'],
  'chimneys': ['new-roofs', 'roof-tiling', 'flat-roofing'],
  'roof-flashing': ['roof-repairs', 'roof-skylights', 'flat-roofing'],
};

export default function ServiceLandingPage({ slug }: { slug: string }) {
  const service = SERVICES.find((item) => item.slug === slug);
  if (!service) return null;

  const photo = service.beforeAfterCase.beforeImage;
  const servicePath = `/${service.slug}/`;
  const schema = generateMedicalProcedureSchema(service.name, service.shortDescription, servicePath);

  return (
    <div className="flex w-full flex-col bg-paper">
      <JsonLd data={schema} />
      <section className="border-b border-mist py-16 md:py-24">
        <div className="mx-auto max-w-site px-6 md:px-12">
          <Breadcrumbs items={[{ name: service.name, path: servicePath }]} />
          <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <AnimateOnScroll animation="fade-right" duration={0.8}>
                <span className="mb-3 block font-body text-13 font-medium uppercase tracking-wider text-brand">
                  Proven Roofing · Cork
                </span>
                <WordRevealH1 text={service.name} />
                <p className="mt-6 max-w-2xl font-body text-17 leading-relaxed text-forest-ink/85 md:text-21">
                  {service.tagline}
                </p>
                <p className="mt-4 max-w-2xl font-body text-15 leading-relaxed text-forest-ink/75 md:text-17">
                  {service.shortDescription}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button href="/request-a-quote/" variant="forest" size="lg">Request a Quote</Button>
                  <Button href={`tel:${CLINIC_INFO.contact.phone.replace(/[^0-9+]/g, '')}`} variant="ghost" size="lg">
                    Call {CLINIC_INFO.contact.phone}
                  </Button>
                </div>
              </AnimateOnScroll>
            </div>
            <AnimateOnScroll animation="fade-left" duration={0.8} className="lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden border border-mist bg-paper-secondary shadow-sm">
                <Image src={photo} alt="Illustrative roofing reference image" fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover" />
              </div>
              <p className="mt-2 font-body text-12 text-forest-light">Illustrative roofing imagery</p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section className="border-b border-mist bg-paper-secondary py-16 md:py-24">
        <div className="mx-auto max-w-site px-6 md:px-12">
          <AnimateOnScroll animation="fade-up" duration={0.8}>
            <span className="mb-2 block font-body text-13 font-medium uppercase tracking-wider text-forest-light">Your project</span>
            <h2 className="font-display text-33 text-forest-ink md:text-41">Planning {service.name.toLowerCase()} for your property</h2>
            <p className="mt-4 max-w-3xl font-body text-15 leading-relaxed text-forest-ink/80 md:text-17">{service.clinicalExplanation}</p>
          </AnimateOnScroll>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="border border-mist bg-paper p-6 md:p-8">
              <h3 className="mb-5 font-display text-21 text-forest-ink">Projects we can discuss</h3>
              <ul className="space-y-3 font-body text-15 text-forest-ink/80">
                {service.whoNeeds.map((item) => <li key={item} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-greenAccent" />{item}</li>)}
              </ul>
            </div>
            <div className="border border-mist bg-paper p-6 md:p-8">
              <h3 className="mb-5 font-display text-21 text-forest-ink">Our approach</h3>
              <ul className="space-y-3 font-body text-15 text-forest-ink/80">
                {service.benefits.map((item) => <li key={item} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-orangeAccent" />{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-mist py-16 md:py-24">
        <div className="mx-auto max-w-site px-6 md:px-12">
          <AnimateOnScroll animation="fade-up" duration={0.8}>
            <span className="mb-2 block font-body text-13 font-medium uppercase tracking-wider text-forest-light">How it works</span>
            <h2 className="font-display text-33 text-forest-ink md:text-41">From first conversation to completion</h2>
          </AnimateOnScroll>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.procedureSteps.map((step) => (
              <article key={step.stepNumber} className="border border-mist bg-paper p-6">
                <span className="mb-4 block font-display text-33 text-brand">0{step.stepNumber}</span>
                <h3 className="mb-2 font-display text-21 text-forest-ink">{step.title}</h3>
                <p className="mb-4 font-body text-13 leading-relaxed text-forest-ink/75">{step.description}</p>
                <p className="font-body text-12 leading-relaxed text-forest-light">{step.duration}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-3xl font-body text-13 leading-relaxed text-forest-light">Quotes and timing depend on the property, selected materials and agreed project scope. The team discusses these details with you before work begins.</p>
        </div>
      </section>

      <section className="border-b border-mist py-16 md:py-24">
        <div className="mx-auto max-w-site px-6 md:px-12">
          <AnimateOnScroll animation="fade-up" duration={0.8}>
            <span className="mb-2 block font-body text-13 font-medium uppercase tracking-wider text-forest-light">When to get in touch</span>
            <h2 className="font-display text-33 text-forest-ink md:text-41">Situations we can discuss</h2>
            <p className="mt-4 max-w-3xl font-body text-15 leading-relaxed text-forest-light md:text-17">
              Tell us what you have noticed or what you are planning. We can talk through the property and help clarify suitable next steps for {service.name.toLowerCase()}.
            </p>
          </AnimateOnScroll>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {service.indications.map((item, index) => (
              <AnimateOnScroll key={item.condition} animation="fade-up" delay={index * 0.08} className="h-full">
                <article className="h-full border border-mist bg-paper p-6 md:p-7">
                  <span className="mb-4 block font-display text-26 text-brand">0{index + 1}</span>
                  <h3 className="mb-3 font-display text-21 text-forest-ink">{item.condition}</h3>
                  <p className="font-body text-15 leading-relaxed text-forest-light">{item.explanation}</p>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-mist bg-paper-secondary py-16 md:py-24">
        <div className="mx-auto grid max-w-site grid-cols-1 gap-10 px-6 md:px-12 lg:grid-cols-12 lg:gap-16">
          <AnimateOnScroll animation="fade-right" className="lg:col-span-5">
            <span className="mb-2 block font-body text-13 font-medium uppercase tracking-wider text-forest-light">Quote &amp; project scope</span>
            <h2 className="font-display text-33 text-forest-ink md:text-41">Clear details before work begins</h2>
            <p className="mt-4 font-body text-15 leading-relaxed text-forest-light md:text-17">{service.costTransparency.note}</p>
            <p className="mt-5 border-l-2 border-brand pl-4 font-body text-15 font-medium text-forest-ink">{service.costTransparency.baseRange}</p>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-left" delay={0.1} className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            <div className="border border-mist bg-paper p-6 md:p-7">
              <h3 className="mb-5 font-display text-21 text-forest-ink">Factors we discuss</h3>
              <ul className="space-y-3 font-body text-15 leading-relaxed text-forest-ink/80">
                {service.costTransparency.factors.map((factor) => <li key={factor} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" />{factor}</li>)}
              </ul>
            </div>
            <div className="border border-mist bg-paper p-6 md:p-7">
              <h3 className="mb-5 font-display text-21 text-forest-ink">A clear scope includes</h3>
              <ul className="space-y-3 font-body text-15 leading-relaxed text-forest-ink/80">
                {service.costTransparency.whatIsIncluded.map((item) => <li key={item} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" />{item}</li>)}
              </ul>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="border-b border-mist py-16 md:py-24">
        <div className="mx-auto max-w-site px-6 md:px-12">
          <AnimateOnScroll animation="fade-up" duration={0.8}>
            <span className="mb-2 block font-body text-13 font-medium uppercase tracking-wider text-forest-light">Project planning</span>
            <h2 className="font-display text-33 text-forest-ink md:text-41">Planning the work</h2>
            <p className="mt-4 max-w-3xl font-body text-15 leading-relaxed text-forest-light md:text-17">Every property and agreed scope is different. These are the main points to plan through with the team.</p>
          </AnimateOnScroll>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {service.recoveryTimeline.map((item, index) => (
              <AnimateOnScroll key={item.period} animation="zoom-in" delay={index * 0.1} className="h-full">
                <article className="h-full border border-mist bg-paper p-6 md:p-7">
                  <h3 className="mb-3 font-display text-21 text-forest-ink">{item.period}</h3>
                  <p className="mb-3 font-body text-15 leading-relaxed text-forest-ink/85">{item.expectedSensations}</p>
                  <p className="font-body text-13 leading-relaxed text-forest-light">{item.careProtocol}</p>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {service.faqs.length > 0 && <section className="border-b border-mist bg-paper-secondary py-16 md:py-24">
        <div className="mx-auto max-w-site px-6 md:px-12">
          <AnimateOnScroll animation="fade-up" duration={0.8} className="mb-8">
            <span className="mb-2 block font-body text-13 font-medium uppercase tracking-wider text-forest-light">Helpful answers</span>
            <h2 className="font-display text-33 text-forest-ink md:text-41">Questions about {service.name.toLowerCase()}</h2>
            <p className="mt-3 max-w-2xl font-body text-15 leading-relaxed text-forest-light">If you have another question about your property, call the team and talk it through.</p>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Accordion items={service.faqs.map(({ question, answer }) => ({ question, answer }))} />
            </div>
            <AnimateOnScroll animation="fade-left" delay={0.1} className="bg-forest p-7 text-paper md:p-9 lg:col-span-5">
              <span className="mb-2 block font-body text-13 font-medium uppercase tracking-wider text-paper/65">Talk with the team</span>
              <h3 className="font-display text-26">A quick conversation can help you plan the next step.</h3>
              <p className="mt-4 font-body text-15 leading-relaxed text-paper/75">Share what you have noticed, ask about the work and arrange a quote for your property.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Button href="/request-a-quote/" variant="paper" size="lg">Request a Quote</Button>
                <Button href={`tel:${CLINIC_INFO.contact.phone.replace(/[^0-9+]/g, '')}`} variant="ghost-light" size="lg">Call the team</Button>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>}

      <section className="border-b border-mist py-16 md:py-24">
        <div className="mx-auto max-w-site px-6 md:px-12">
          <AnimateOnScroll animation="fade-up" duration={0.8}>
            <span className="mb-2 block font-body text-13 font-medium uppercase tracking-wider text-forest-light">Explore more</span>
            <h2 className="font-display text-33 text-forest-ink md:text-41">Related roofing services</h2>
          </AnimateOnScroll>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {(RELATED_SERVICE_SLUGS[service.slug] ?? []).map((relatedSlug, index) => {
              const related = SERVICES.find((item) => item.slug === relatedSlug);
              if (!related) return null;
              return (
                <AnimateOnScroll key={related.slug} animation="fade-up" delay={index * 0.08} className="h-full">
                  <Link href={`/${related.slug}/`} className="group flex h-full flex-col border border-mist bg-paper p-6 transition-colors hover:bg-paper-secondary md:p-7">
                    <h3 className="font-display text-21 text-forest-ink">{related.name}</h3>
                    <p className="mt-3 flex-1 font-body text-15 leading-relaxed text-forest-light">{related.shortDescription}</p>
                    <span className="mt-6 font-body text-13 font-medium text-brand transition-colors group-hover:text-brand-hover">Explore service →</span>
                  </Link>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-forest py-14 text-paper md:py-20">
        <div className="mx-auto flex max-w-site flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center md:px-12">
          <div>
            <span className="mb-2 block font-body text-13 font-semibold uppercase tracking-wider text-paper/65">Proven Roofing · Cork roofing contractor</span>
            <h2 className="font-display text-26 md:text-33">Tell us what you have in mind.</h2>
          </div>
          <Link href="/request-a-quote/" className="inline-flex min-h-12 items-center justify-center bg-paper px-6 font-body text-15 font-semibold text-forest transition-colors hover:bg-softBlue">Request a quote</Link>
        </div>
      </section>
    </div>
  );
}

export function getServiceMetadata(slug: string) {
  const service = SERVICES.find((item) => item.slug === slug);
  if (!service) return {};
  return createMetadata({ title: service.name, description: service.shortDescription, pathname: `/${service.slug}/` });
}
