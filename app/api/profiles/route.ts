import { NextRequest, NextResponse } from 'next/server';
import { createProfile, listProfiles } from '@/lib/profileStorage';
import { CreateProfileRequest, ProfileListResponse, ProfileResponse } from '@/types/profile';

// GET /api/profiles - List all profiles
export async function GET() {
  try {
    const profiles = await listProfiles();
    const response: ProfileListResponse = {
      success: true,
      profiles,
    };
    return NextResponse.json(response);
  } catch (error) {
    const response: ProfileListResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to list profiles',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

// POST /api/profiles - Create new profile
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as CreateProfileRequest;

    if (!body.name || body.name.trim() === '') {
      const response: ProfileResponse = {
        success: false,
        error: 'Profile name is required',
      };
      return NextResponse.json(response, { status: 400 });
    }

    const profile = await createProfile(body);
    const response: ProfileResponse = {
      success: true,
      profile,
    };
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    const response: ProfileResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create profile',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
