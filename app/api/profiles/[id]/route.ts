import { NextRequest, NextResponse } from 'next/server';
import { getProfile, updateProfile, deleteProfile } from '@/lib/profileStorage';
import { ProfileResponse, UpdateProfileRequest } from '@/types/profile';

// GET /api/profiles/[id] - Get specific profile
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const profile = await getProfile(params.id);

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
      error: error instanceof Error ? error.message : 'Failed to get profile',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

// PUT /api/profiles/[id] - Update profile
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json() as UpdateProfileRequest;
    const profile = await updateProfile(params.id, body as any);

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
      error: error instanceof Error ? error.message : 'Failed to update profile',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

// DELETE /api/profiles/[id] - Delete profile
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = await deleteProfile(params.id);

    if (!success) {
      const response: ProfileResponse = {
        success: false,
        error: 'Profile not found',
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ProfileResponse = {
      success: true,
    };
    return NextResponse.json(response);
  } catch (error) {
    const response: ProfileResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete profile',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
