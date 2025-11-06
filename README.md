# Livestream Overlay

A server-based livestream overlay system built with React, Next.js, and TailwindCSS.

It is designed to be used with OBS Studio, but can be used with any streaming software that supports browser sources.

## Features

- **Multiple Profiles**: Create unlimited overlay profiles, each with unique URLs
- **WebSocket Real-time Sync**: True real-time synchronization across all clients using Socket.IO
  - Changes broadcast instantly to all viewing instances
  - Automatic reconnection with exponential backoff
  - HTTP fallback for degraded connections
  - Visual connection status indicator
- **Component Library**: Reusable components shared across all profiles
- **Dynamic Configuration**: JSON-based configuration for easy customization
- **Modern Stack**: Built with React 18, Next.js 14, TailwindCSS, and Socket.IO

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Usage

1. Navigate to `http://localhost:3000` to access the dashboard
2. Click "Create New Profile" to create an overlay profile
3. Click "Open Overlay" to open the overlay in a new tab
4. Use the overlay URL in OBS as a browser source
5. Any changes made in the overlay automatically sync to the server

## Documentation

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed documentation on:
- System architecture
- Data model
- API endpoints
- Component library
- Extending the system

## Technology Stack

- **React 18** - UI framework
- **Next.js 14** - React framework with App Router
- **Socket.IO** - WebSocket library for real-time communication
- **TailwindCSS** - Utility-first CSS framework
- **TypeScript** - Type safety
- **File-based Storage** - JSON profile storage (easily replaceable with database)
- **Custom Node.js Server** - Wraps Next.js to enable WebSocket support

## Project Structure

```
livestream-overlay/
├── app/              # Next.js app directory
│   ├── api/         # API routes
│   ├── overlay/     # Overlay pages
│   └── page.tsx     # Dashboard
├── components/      # React components
├── lib/            # Utilities and storage
├── types/          # TypeScript types
├── data/           # Profile storage
└── public/         # Static assets
```

## License

For personal use.