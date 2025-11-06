'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { PageProfile } from '@/types/profile';
import { useSocket } from './socketContext';

interface ProfileContextType {
  profile: PageProfile | null;
  loading: boolean;
  error: string | null;
  isConnected: boolean;
  updateConfig: (config: Partial<PageProfile['config']>) => void;
  syncToServer: () => void;
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

  const {
    isConnected,
    joinProfile,
    leaveProfile,
    updateConfig: socketUpdateConfig,
    onConfigUpdated,
    offConfigUpdated,
    socket
  } = useSocket();

  // Load profile on mount if not provided
  useEffect(() => {
    if (!initialProfile) {
      loadProfile();
    }
  }, [profileId]);

  // Join profile room when socket connects
  useEffect(() => {
    if (isConnected && profileId) {
      joinProfile(profileId);

      return () => {
        leaveProfile(profileId);
      };
    }
  }, [isConnected, profileId, joinProfile, leaveProfile]);

  // Listen for config updates from other clients
  useEffect(() => {
    const handleConfigUpdate = (data: { profileId: string; config: PageProfile['config'] }) => {
      if (data.profileId === profileId && profile) {
        console.log('Received config update from server:', data);
        setProfile({
          ...profile,
          config: data.config,
        });
      }
    };

    onConfigUpdated(handleConfigUpdate);

    return () => {
      offConfigUpdated(handleConfigUpdate);
    };
  }, [profileId, profile, onConfigUpdated, offConfigUpdated]);

  // Listen for update success/error
  useEffect(() => {
    if (!socket) return;

    const handleUpdateSuccess = (data: { profileId: string; config: PageProfile['config'] }) => {
      if (data.profileId === profileId && profile) {
        console.log('Config update successful:', data);
        setProfile({
          ...profile,
          config: data.config,
        });
        setError(null);
      }
    };

    const handleUpdateError = (data: { profileId: string; error: string }) => {
      if (data.profileId === profileId) {
        console.error('Config update error:', data.error);
        setError(data.error);
        // Reload profile from server
        loadProfile();
      }
    };

    socket.on('update-success', handleUpdateSuccess);
    socket.on('update-error', handleUpdateError);

    return () => {
      socket.off('update-success', handleUpdateSuccess);
      socket.off('update-error', handleUpdateError);
    };
  }, [socket, profileId, profile]);

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

  const updateConfig = useCallback((config: Partial<PageProfile['config']>) => {
    if (!profile) return;

    // Optimistic update
    setProfile({
      ...profile,
      config: {
        ...profile.config,
        ...config,
      },
    });

    // Send update via WebSocket
    if (isConnected) {
      socketUpdateConfig(profileId, config);
    } else {
      // Fallback to HTTP if WebSocket not connected
      console.warn('WebSocket not connected, falling back to HTTP');
      updateConfigHTTP(config);
    }
  }, [profile, isConnected, profileId, socketUpdateConfig]);

  const updateConfigHTTP = async (config: Partial<PageProfile['config']>) => {
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

  const syncToServer = useCallback(() => {
    if (!profile) return;
    updateConfig(profile.config);
  }, [profile, updateConfig]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        error,
        isConnected,
        updateConfig,
        syncToServer,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
