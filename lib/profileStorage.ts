import fs from 'fs/promises';
import path from 'path';
import { PageProfile, ProfileListItem, CreateProfileRequest } from '@/types/profile';

const PROFILES_DIR = path.join(process.cwd(), 'data', 'profiles');

// Ensure profiles directory exists
export async function ensureProfilesDir() {
  try {
    await fs.mkdir(PROFILES_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating profiles directory:', error);
  }
}

// Generate unique profile ID
function generateProfileId(): string {
  return `profile_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// Get default profile config
function getDefaultConfig(): PageProfile['config'] {
  return {
    layout: {
      activeLayout: 'default',
    },
    header: {
      liveStreamingText: '直播进行中',
      showLocalTime: true,
      showCNTime: true,
      showTimer: true,
      infoblocks: [
        { id: 1, blockTitle: '今日直播目标', blockContent: '活着下播' },
        { id: 2, blockTitle: '直播群', blockContent: '670415161' },
      ],
    },
    footer: {
      enabled: true,
      texts: [
        '随便开播 随时下播 其实不是很建议点进来看...',
        '...这话我其实写直播间封面上了，不过我猜你肯定没看。',
        '这个遮罩是用React+Next.js写的！',
      ],
      rotationInterval: 7000,
    },
  };
}

// Create a new profile
export async function createProfile(data: CreateProfileRequest): Promise<PageProfile> {
  await ensureProfilesDir();

  const id = generateProfileId();
  const now = new Date().toISOString();

  const profile: PageProfile = {
    id,
    name: data.name,
    description: data.description,
    createdAt: now,
    updatedAt: now,
    config: data.config || getDefaultConfig(),
  };

  const filePath = path.join(PROFILES_DIR, `${id}.json`);
  await fs.writeFile(filePath, JSON.stringify(profile, null, 2), 'utf-8');

  return profile;
}

// Get all profiles (list view)
export async function listProfiles(): Promise<ProfileListItem[]> {
  await ensureProfilesDir();

  const files = await fs.readdir(PROFILES_DIR);
  const jsonFiles = files.filter(f => f.endsWith('.json'));

  const profiles: ProfileListItem[] = [];

  for (const file of jsonFiles) {
    try {
      const filePath = path.join(PROFILES_DIR, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const profile = JSON.parse(content) as PageProfile;

      profiles.push({
        id: profile.id,
        name: profile.name,
        description: profile.description,
        updatedAt: profile.updatedAt,
      });
    } catch (error) {
      console.error(`Error reading profile ${file}:`, error);
    }
  }

  return profiles.sort((a, b) =>
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

// Get a single profile by ID
export async function getProfile(id: string): Promise<PageProfile | null> {
  await ensureProfilesDir();

  try {
    const filePath = path.join(PROFILES_DIR, `${id}.json`);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as PageProfile;
  } catch (error) {
    return null;
  }
}

// Update a profile
export async function updateProfile(
  id: string,
  updates: Partial<Omit<PageProfile, 'id' | 'createdAt'>>
): Promise<PageProfile | null> {
  const existing = await getProfile(id);
  if (!existing) return null;

  const updated: PageProfile = {
    ...existing,
    ...updates,
    id: existing.id,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString(),
    config: updates.config ? { ...existing.config, ...updates.config } : existing.config,
  };

  const filePath = path.join(PROFILES_DIR, `${id}.json`);
  await fs.writeFile(filePath, JSON.stringify(updated, null, 2), 'utf-8');

  return updated;
}

// Delete a profile
export async function deleteProfile(id: string): Promise<boolean> {
  try {
    const filePath = path.join(PROFILES_DIR, `${id}.json`);
    await fs.unlink(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

// Update profile config only
export async function updateProfileConfig(
  id: string,
  config: Partial<PageProfile['config']>
): Promise<PageProfile | null> {
  const existing = await getProfile(id);
  if (!existing) return null;

  const updated: PageProfile = {
    ...existing,
    updatedAt: new Date().toISOString(),
    config: {
      layout: config.layout || existing.config.layout,
      header: config.header || existing.config.header,
      footer: config.footer || existing.config.footer,
    },
  };

  const filePath = path.join(PROFILES_DIR, `${id}.json`);
  await fs.writeFile(filePath, JSON.stringify(updated, null, 2), 'utf-8');

  return updated;
}
