'use client';

import { ReactNode } from 'react';
import { SocketProvider } from '@/lib/socketContext';
import { ProfileProvider } from '@/lib/profileContext';
import { PageProfile } from '@/types/profile';

interface ClientWrapperProps {
  profileId: string;
  initialProfile: PageProfile;
  children: ReactNode;
}

export default function ClientWrapper({ profileId, initialProfile, children }: ClientWrapperProps) {
  return (
    <SocketProvider>
      <ProfileProvider profileId={profileId} initialProfile={initialProfile}>
        {children}
      </ProfileProvider>
    </SocketProvider>
  );
}
