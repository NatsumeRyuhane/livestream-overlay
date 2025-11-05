# Livestream Overlay Architecture

## Overview

This is a server-based livestream overlay system built with React, Next.js, and TailwindCSS. It supports multiple overlay profiles, real-time configuration syncing, and dynamic rendering based on JSON configuration files.

## Features

### 1. Multiple Profile Support
- Create unlimited overlay profiles, each accessible via unique URLs
- Each profile has its own configuration stored as JSON
- Profiles can be created, edited, and deleted via the dashboard

### 2. Component Library
All overlay components are shared between profiles:
- **Clock**: Displays time with optional timezone support
- **LivestreamTimer**: Tracks livestream duration with reset functionality
- **InfoBlock**: Editable info blocks with customizable titles and content
- **Header**: Main header with layout switcher and info blocks
- **Footer**: Footer with rotating text messages
- **Stage**: Green screen stage area
- **DanmakuArea**: Chat log display area

### 3. Dynamic Layouts
Two built-in layouts:
- **DefaultLayout**: Includes stage and danmaku area
- **NoStageLayout**: Danmaku area only

### 4. Real-time Sync
- Client-side changes automatically sync to server
- Layout switches persist across sessions
- Info block changes are saved immediately

## Architecture

```
livestream-overlay/
├── app/
│   ├── api/                    # API routes
│   │   └── profiles/
│   │       ├── route.ts        # List/create profiles
│   │       └── [id]/
│   │           ├── route.ts    # Get/update/delete profile
│   │           └── config/
│   │               └── route.ts # Update config only
│   ├── overlay/                # Overlay renderer
│   │   └── [id]/
│   │       └── page.tsx        # Dynamic overlay page
│   ├── page.tsx                # Dashboard/admin UI
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/                 # Shared components
│   ├── Clock.tsx
│   ├── LivestreamTimer.tsx
│   ├── InfoBlock.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Stage.tsx
│   ├── DanmakuArea.tsx
│   ├── DefaultLayout.tsx
│   ├── NoStageLayout.tsx
│   └── OverlayRenderer.tsx     # Main renderer
├── lib/
│   ├── profileStorage.ts       # File-based storage
│   └── profileContext.tsx      # React context for profiles
├── types/
│   └── profile.ts              # TypeScript types
├── data/
│   └── profiles/               # JSON profile storage
│       └── *.json
└── public/                     # Static assets
    ├── fonts/
    └── images/
```

## Data Model

### PageProfile
```typescript
interface PageProfile {
  id: string;                   // Unique profile ID
  name: string;                 // Display name
  description?: string;         // Optional description
  createdAt: string;           // ISO timestamp
  updatedAt: string;           // ISO timestamp
  config: {
    layout: {
      activeLayout: 'default' | 'no-stage';
    };
    header: {
      liveStreamingText: string;
      showLocalTime: boolean;
      showCNTime: boolean;
      showTimer: boolean;
      infoblocks: Array<{
        id: number;
        blockTitle: string;
        blockContent: string;
      }>;
    };
    footer: {
      enabled: boolean;
      texts: string[];
      rotationInterval: number;
    };
  };
}
```

## API Endpoints

### GET /api/profiles
List all profiles
```json
{
  "success": true,
  "profiles": [
    {
      "id": "profile_123",
      "name": "My Overlay",
      "description": "...",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### POST /api/profiles
Create new profile
```json
{
  "name": "New Overlay",
  "description": "Optional description",
  "config": { /* optional custom config */ }
}
```

### GET /api/profiles/[id]
Get specific profile with full configuration

### PUT /api/profiles/[id]
Update profile metadata and/or config

### DELETE /api/profiles/[id]
Delete profile

### PATCH /api/profiles/[id]/config
Update only the configuration (used for real-time sync)

## Usage

### Running the Server

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

### Creating a Profile

1. Navigate to the dashboard at `http://localhost:3000`
2. Click "Create New Profile"
3. Enter name and optional description
4. Click "Create"

### Using an Overlay

1. From the dashboard, click "Open Overlay" on any profile
2. The overlay opens in a new tab at `/overlay/[profile-id]`
3. Use this URL in OBS or your streaming software
4. Any changes made in the overlay automatically sync to the server

### Customizing Configuration

You can manually edit profile JSON files in `data/profiles/`:

```json
{
  "id": "profile_123",
  "name": "My Custom Overlay",
  "config": {
    "header": {
      "infoblocks": [
        {
          "id": 1,
          "blockTitle": "Custom Title",
          "blockContent": "Custom Content"
        }
      ]
    },
    "footer": {
      "texts": [
        "Custom footer message 1",
        "Custom footer message 2"
      ],
      "rotationInterval": 5000
    }
  }
}
```

## Component Configuration

### Header
- Shows livestream title, timer, and clocks
- Supports editable info blocks
- Layout switcher button

### Footer
- Rotating text messages
- Configurable rotation interval
- Can be disabled per profile

### Layouts
- **Default**: Stage (16:10) + Chat log area
- **No Stage**: Chat log area only

## Extending the System

### Adding New Components

1. Create component in `components/`
2. Add config interface to `types/profile.ts`
3. Update default config in `lib/profileStorage.ts`
4. Import and use in `OverlayRenderer.tsx`

### Adding New Layouts

1. Create layout component in `components/`
2. Add layout type to `LayoutConfig` in `types/profile.ts`
3. Add conditional rendering in `OverlayRenderer.tsx`

### Custom Storage Backend

Replace `lib/profileStorage.ts` with your own implementation:
- Database (PostgreSQL, MongoDB, etc.)
- Cloud storage (S3, Google Cloud Storage)
- Key-value store (Redis)

Just maintain the same function signatures for compatibility.

## Notes

- Profile IDs are generated as `profile_{timestamp}_{random}`
- All timestamps are ISO 8601 format
- Profile data is stored in `data/profiles/` directory
- The system automatically creates the data directory on first use
- Real-time sync uses HTTP polling (can be upgraded to WebSocket)

## Future Enhancements

Potential improvements:
- WebSocket for true real-time sync
- Profile templates
- Import/export profiles
- Component marketplace
- Animation library
- Multi-user support with authentication
- Profile versioning and rollback
