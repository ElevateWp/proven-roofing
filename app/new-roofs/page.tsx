import type { Metadata } from 'next';
import ServiceLandingPage, { getServiceMetadata } from '@/components/sections/services/ServiceLandingPage';

export const metadata: Metadata = getServiceMetadata('new-roofs');

export default function ExtensionsPage() {
  return <ServiceLandingPage slug="new-roofs" />;
}
