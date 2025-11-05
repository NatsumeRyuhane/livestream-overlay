'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PageProfile } from '@/types/profile';

interface ProfileContextType {
  profile: PageProfile | null;
  loading: boolean;
  error: string | null;
  updateConfig: (config: Partial<PageProfile['config']>) => Promise<void>;
  syncToServer: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return context;
}

interface ProfileProviderProps {
  profileId: string;
  initialProfile?: PageProfile;
  children: ReactNode;
}

export function ProfileProvider({ profileId, initialProfile, children }: ProfileProviderProps) {
  const [profile, setProfile] = useState<PageProfile | null>(initialProfile || null);
  const [loading, setLoading] = useState(!initialProfile);
  const [error, setError] = useState<string | null>(null);

  // Load profile on mount if not provided
  useEffect(() => {
    if (!initialProfile) {
      loadProfile();
    }
  }, [profileId]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/profiles/${profileId}`);
      const data = await response.json();

      if (data.success && data.profile) {
        setProfile(data.profile);
        setError(null);
      } else {
        setError(data.error || 'Failed to load profile');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const updateConfig = async (config: Partial<PageProfile['config']>) => {
    if (!profile) return;

    // Optimistic update
    setProfile({
      ...profile,
      config: {
        ...profile.config,
        ...config,
      },
    });

    try {
      const response = await fetch(`/api/profiles/${profileId}/config`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      const data = await response.json();

      if (data.success && data.profile) {
        setProfile(data.profile);
      } else {
        // Revert on error
        await loadProfile();
        setError(data.error || 'Failed to update config');
      }
    } catch (err) {
      // Revert on error
      await loadProfile();
      setError(err instanceof Error ? err.message : 'Failed to update config');
    }
  };

  const syncToServer = async () => {
    if (!profile) return;
    await updateConfig(profile.config);
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        error,
        updateConfig,
        syncToServer,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
