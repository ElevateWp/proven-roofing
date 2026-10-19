import type { Metadata } from 'next';
import ServiceLandingPage, { getServiceMetadata } from '@/components/sections/services/ServiceLandingPage';
export const metadata: Metadata = getServiceMetadata('roof-flashing');
export default function EmergencyRoofRepairsPage() { return <ServiceLandingPage slug="roof-flashing" />; }
