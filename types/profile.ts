// Profile configuration types

export interface InfoBlockData {
  id: number;
  blockTitle: string;
  blockContent: string;
}

export interface HeaderConfig {
  liveStreamingText: string;
  showLocalTime: boolean;
  showCNTime: boolean;
  showTimer: boolean;
  infoblocks: InfoBlockData[];
}

export interface FooterConfig {
  enabled: boolean;
  texts: string[];
  rotationInterval: number; // milliseconds
}

export interface LayoutConfig {
  activeLayout: 'default' | 'no-stage';
}

export interface PageProfile {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  config: {
    layout: LayoutConfig;
    header: HeaderConfig;
    footer: FooterConfig;
  };
}

export interface ProfileListItem {
  id: string;
  name: string;
  description?: string;
  updatedAt: string;
}

export interface CreateProfileRequest {
  name: string;
  description?: string;
  config?: PageProfile['config'];
}

export interface UpdateProfileRequest {
  name?: string;
  description?: string;
  config?: Partial<PageProfile['config']>;
}

export interface ProfileResponse {
  success: boolean;
  profile?: PageProfile;
  error?: string;
}

export interface ProfileListResponse {
  success: boolean;
  profiles?: ProfileListItem[];
  error?: string;
}
