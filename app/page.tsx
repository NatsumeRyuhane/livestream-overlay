'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProfileListItem } from '@/types/profile';

export default function Dashboard() {
  const [profiles, setProfiles] = useState<ProfileListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileDesc, setNewProfileDesc] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/profiles');
      const data = await response.json();

      if (data.success) {
        setProfiles(data.profiles || []);
        setError(null);
      } else {
        setError(data.error || 'Failed to load profiles');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profiles');
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async () => {
    if (!newProfileName.trim()) {
      alert('Please enter a profile name');
      return;
    }

    try {
      setCreating(true);
      const response = await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProfileName,
          description: newProfileDesc,
        }),
      });

      const data = await response.json();

      if (data.success && data.profile) {
        setShowCreateModal(false);
        setNewProfileName('');
        setNewProfileDesc('');
        await loadProfiles();
      } else {
        alert(data.error || 'Failed to create profile');
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create profile');
    } finally {
      setCreating(false);
    }
  };

  const deleteProfile = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/profiles/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        await loadProfiles();
      } else {
        alert(data.error || 'Failed to delete profile');
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete profile');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Livestream Overlay Manager</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-primary hover:bg-primary-light text-white rounded-lg font-semibold transition-colors"
          >
            + Create New Profile
          </button>
        </div>

        {loading && (
          <div className="text-white text-center py-12">
            <p className="text-xl">Loading profiles...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
            <p className="font-semibold">Error: {error}</p>
          </div>
        )}

        {!loading && !error && profiles.length === 0 && (
          <div className="text-white text-center py-12 bg-gray-800 rounded-lg">
            <p className="text-xl mb-4">No profiles yet</p>
            <p className="text-gray-400">Create your first overlay profile to get started!</p>
          </div>
        )}

        {!loading && profiles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-primary transition-colors"
              >
                <h3 className="text-xl font-bold text-white mb-2">{profile.name}</h3>
                {profile.description && (
                  <p className="text-gray-400 text-sm mb-4">{profile.description}</p>
                )}
                <p className="text-gray-500 text-xs mb-4">
                  Updated: {new Date(profile.updatedAt).toLocaleString()}
                </p>
                <div className="flex gap-2">
                  <Link
                    href={`/overlay/${profile.id}`}
                    target="_blank"
                    className="flex-1 px-4 py-2 bg-primary hover:bg-primary-light text-white text-center rounded font-semibold transition-colors"
                  >
                    Open Overlay
                  </Link>
                  <button
                    onClick={() => deleteProfile(profile.id, profile.name)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-semibold transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showCreateModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-white mb-6">Create New Profile</h2>

              <div className="mb-4">
                <label className="block text-white mb-2 font-semibold">Profile Name *</label>
                <input
                  type="text"
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-primary focus:outline-none"
                  placeholder="My Overlay"
                />
              </div>

              <div className="mb-6">
                <label className="block text-white mb-2 font-semibold">Description (optional)</label>
                <textarea
                  value={newProfileDesc}
                  onChange={(e) => setNewProfileDesc(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-primary focus:outline-none resize-none"
                  rows={3}
                  placeholder="Description of this overlay profile"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={createProfile}
                  disabled={creating}
                  className="flex-1 px-6 py-3 bg-primary hover:bg-primary-light text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {creating ? 'Creating...' : 'Create'}
                </button>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewProfileName('');
                    setNewProfileDesc('');
                  }}
                  disabled={creating}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
