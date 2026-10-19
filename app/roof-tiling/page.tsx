import type { Metadata } from 'next';
import ServiceLandingPage, { getServiceMetadata } from '@/components/sections/services/ServiceLandingPage';

export const metadata: Metadata = getServiceMetadata('roof-tiling');

export default function ConversionsPage() {
  return <ServiceLandingPage slug="roof-tiling" />;
}
