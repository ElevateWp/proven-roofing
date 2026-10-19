import type { Metadata } from 'next';
import ServiceLandingPage, { getServiceMetadata } from '@/components/sections/services/ServiceLandingPage';

export const metadata: Metadata = getServiceMetadata('flat-roofing');

export default function RefurbishmentsPage() {
  return <ServiceLandingPage slug="flat-roofing" />;
}
