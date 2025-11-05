import { notFound } from 'next/navigation';
import { getProfile } from '@/lib/profileStorage';
import OverlayRenderer from '@/components/OverlayRenderer';
import { ProfileProvider } from '@/lib/profileContext';

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
    <ProfileProvider profileId={params.id} initialProfile={profile}>
      <OverlayRenderer />
    </ProfileProvider>
  );
}
