import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES } from '@/lib/clinic-data';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import WordRevealH1 from '@/components/motion/WordRevealH1';
import AnimateOnScroll from '@/components/motion/AnimateOnScroll';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({ title: 'Roofing Services in Cork', description: 'Explore roof repairs, new roofs, flat roofing, roof tiling, skylights, chimneys and guttering services from Proven Roofing.', pathname: '/services/' });

export default function ServicesPage() {
  return <div className="w-full bg-paper">
    <section className="border-b border-mist py-16 md:py-24"><div className="mx-auto max-w-site px-6 md:px-12">
      <Breadcrumbs items={[{ name: 'Services', path: '/services/' }]} />
      <div className="mt-8 max-w-3xl"><span className="mb-3 block font-body text-13 font-medium uppercase tracking-wider text-forest-light">Proven Roofing · Cork</span><WordRevealH1 text="Roofing services for your property." /><p className="mt-6 font-body text-17 leading-relaxed text-forest-ink/85 md:text-21">Explore our roof repairs, new roofs, flat roofing, skylights, chimney and guttering services across County Cork.</p></div>
    </div></section>
    <section className="bg-paper-secondary py-16 md:py-24"><div className="mx-auto grid max-w-site grid-cols-1 gap-5 px-6 md:grid-cols-2 md:px-12 lg:grid-cols-3">
      {SERVICES.map((service, index) => <AnimateOnScroll key={service.slug} animation="fade-up" delay={index * 0.04}><Link href={`/${service.slug}/`} className="group block h-full border border-mist bg-paper p-6 transition-colors hover:border-forest-light md:p-8"><span className="font-display text-33 text-brand">0{index + 1}</span><h2 className="mt-4 font-display text-21 text-forest-ink md:text-26">{service.name}</h2><p className="mt-3 font-body text-15 leading-relaxed text-forest-ink/75">{service.shortDescription}</p><span className="mt-6 inline-block font-body text-15 font-semibold text-forest group-hover:underline">Learn more →</span></Link></AnimateOnScroll>)}
    </div></section>
  </div>;
}
