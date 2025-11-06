import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server as SocketIOServer } from 'socket.io';
import { updateProfileConfig } from './lib/profileStorage';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url!, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  // Initialize Socket.IO
  const io = new SocketIOServer(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  // Socket.IO connection handling
  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Join a profile room
    socket.on('join-profile', (profileId: string) => {
      socket.join(`profile:${profileId}`);
      console.log(`Client ${socket.id} joined profile: ${profileId}`);
    });

    // Leave a profile room
    socket.on('leave-profile', (profileId: string) => {
      socket.leave(`profile:${profileId}`);
      console.log(`Client ${socket.id} left profile: ${profileId}`);
    });

    // Handle config updates
    socket.on('update-config', async (data: { profileId: string; config: any }) => {
      try {
        const { profileId, config } = data;

        // Update the profile config in storage
        const updatedProfile = await updateProfileConfig(profileId, config);

        if (updatedProfile) {
          // Broadcast to all clients in the profile room (except sender)
          socket.to(`profile:${profileId}`).emit('config-updated', {
            profileId,
            config: updatedProfile.config,
          });

          // Send acknowledgment to sender
          socket.emit('update-success', {
            profileId,
            config: updatedProfile.config,
          });
        } else {
          socket.emit('update-error', {
            profileId,
            error: 'Profile not found',
          });
        }
      } catch (error) {
        console.error('Error updating config:', error);
        socket.emit('update-error', {
          profileId: data.profileId,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log(`> WebSocket server running`);
  });
});
