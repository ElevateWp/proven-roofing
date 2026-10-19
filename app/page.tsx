import React from 'react';
import { Metadata } from 'next';
import HomeHero from '@/components/sections/home/HomeHero';
import HomeStats from '@/components/sections/home/HomeStats';
import HomeReviews from '@/components/sections/home/HomeReviews';
import PinnedHorizontalTrack, { HorizontalTrackItem } from '@/components/motion/PinnedHorizontalTrack';
import HomeWhyUs from '@/components/sections/home/HomeWhyUs';
import HomeDentists from '@/components/sections/home/HomeDentists';
import HomeFeaturedTreatments from '@/components/sections/home/HomeFeaturedTreatments';
import HomeBeforeAfter from '@/components/sections/home/HomeBeforeAfter';
import HomeGallery from '@/components/sections/home/HomeGallery';
import HomeFaqs from '@/components/sections/home/HomeFaqs';
import HomeLocation from '@/components/sections/home/HomeLocation';
import HomeFinalCTA from '@/components/sections/home/HomeFinalCTA';
import TextureBackground from '@/components/layout/TextureBackground';
import { SERVICES } from '@/lib/clinic-data';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Roofing Contractor in Cork',
  description:
    'Proven Roofing LTD provides roof repairs, new roofs, flat roofing, guttering and roofline services across County Cork. Call +353 87 069 0272.',
  pathname: '/',
});

export default function HomePage() {
  const serviceTrackItems: HorizontalTrackItem[] = SERVICES.map((s, idx) => ({
    id: s.slug,
    title: s.name,
    subtitle: s.tagline,
    description: s.shortDescription,
    href: `/${s.slug}/`,
    theme: idx % 2 === 1 ? 'forest' : 'paper',
  }));

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: Hero */}
      <HomeHero />

      {/* SECTION 2: Trust / Highlights */}
      <HomeStats />

      {/* SECTION 2A: Positive Google Reviews */}
      <HomeReviews />

      {/* SECTION 3: Roofing Services */}
      <PinnedHorizontalTrack
        items={serviceTrackItems}
        title="Roofing Services in Cork"
      />

      {/* Signature Brand Device 2 of 4: Full-Bleed Section Divider */}
      <div className="relative w-full h-24 md:h-36 bg-paper overflow-hidden">
        <TextureBackground variant="divider" className="opacity-30" />
      </div>

      {/* SECTION 4: Why Choose Proven Roofing */}
      <HomeWhyUs />

      {/* SECTION 5: Meet Our Team */}
      <HomeDentists />

      {/* SECTION 6: Featured Roofing Work */}
      <HomeFeaturedTreatments />

      {/* SECTION 7: Before & After (Draggable Slider - Orchestrated Moment 3) */}
      <HomeBeforeAfter />

      {/* SECTION 9: Roofing Inspiration */}
      <HomeGallery />

      {/* SECTION 10: Frequently Asked Questions */}
      <HomeFaqs />

      {/* SECTION 11: Service Area and Opening Hours */}
      <HomeLocation />

      {/* SECTION 12: Request a Quote */}
      <HomeFinalCTA />
    </div>
  );
}
