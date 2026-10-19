import type { Metadata } from 'next';
import ServiceLandingPage from '@/components/sections/services/ServiceLandingPage';
import { getServiceMetadata } from '@/components/sections/services/ServiceLandingPage';
export const metadata: Metadata = getServiceMetadata('soffit-and-fascia');
export default function ServicePage() { return <ServiceLandingPage slug="soffit-and-fascia" />; }
