import { notFound } from 'next/navigation';
import { getProfile } from '@/lib/profileStorage';
import OverlayRenderer from '@/components/OverlayRenderer';
import ClientWrapper from './ClientWrapper';

interface OverlayPageProps {
  params: {
    id: string;
  };
}

export default async function OverlayPage({ params }: OverlayPageProps) {
  const profile = await getProfile(params.id);

  if (!profile) {
    notFound();
  }

  return (
    <ClientWrapper profileId={params.id} initialProfile={profile}>
      <OverlayRenderer />
    </ClientWrapper>
  );
}
