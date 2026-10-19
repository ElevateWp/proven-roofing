import type { Metadata } from 'next';
import ServiceLandingPage, { getServiceMetadata } from '@/components/sections/services/ServiceLandingPage';
export const metadata: Metadata = getServiceMetadata('roof-valleys');
export default function ShedRepairsPage() { return <ServiceLandingPage slug="roof-valleys" />; }
