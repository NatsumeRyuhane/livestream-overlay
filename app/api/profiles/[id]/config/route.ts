import { NextRequest, NextResponse } from 'next/server';
import { updateProfileConfig } from '@/lib/profileStorage';
import { ProfileResponse, PageProfile } from '@/types/profile';

// PATCH /api/profiles/[id]/config - Update profile config only (for real-time sync)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json() as Partial<PageProfile['config']>;
    const profile = await updateProfileConfig(params.id, body);

    if (!profile) {
      const response: ProfileResponse = {
        success: false,
        error: 'Profile not found',
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ProfileResponse = {
      success: true,
      profile,
    };
    return NextResponse.json(response);
  } catch (error) {
    const response: ProfileResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update profile config',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
