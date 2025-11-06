'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { PageProfile } from '@/types/profile';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  joinProfile: (profileId: string) => void;
  leaveProfile: (profileId: string) => void;
  updateConfig: (profileId: string, config: Partial<PageProfile['config']>) => void;
  onConfigUpdated: (callback: (data: { profileId: string; config: PageProfile['config'] }) => void) => void;
  offConfigUpdated: (callback: (data: { profileId: string; config: PageProfile['config'] }) => void) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return context;
}

interface SocketProviderProps {
  children: ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initialize Socket.IO client
    const socketInstance = io({
      path: '/socket.io',
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
    });

    socketInstance.on('connect', () => {
      console.log('WebSocket connected:', socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on('disconnect', (reason) => {
      console.log('WebSocket disconnected:', reason);
      setIsConnected(false);
    });

    socketInstance.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      setIsConnected(false);
    });

    socketInstance.on('reconnect', (attemptNumber) => {
      console.log('WebSocket reconnected after', attemptNumber, 'attempts');
      setIsConnected(true);
    });

    socketInstance.on('reconnect_error', (error) => {
      console.error('WebSocket reconnection error:', error);
    });

    socketInstance.on('reconnect_failed', () => {
      console.error('WebSocket reconnection failed');
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const joinProfile = (profileId: string) => {
    if (socket && isConnected) {
      socket.emit('join-profile', profileId);
    }
  };

  const leaveProfile = (profileId: string) => {
    if (socket && isConnected) {
      socket.emit('leave-profile', profileId);
    }
  };

  const updateConfig = (profileId: string, config: Partial<PageProfile['config']>) => {
    if (socket && isConnected) {
      socket.emit('update-config', { profileId, config });
    }
  };

  const onConfigUpdated = (callback: (data: { profileId: string; config: PageProfile['config'] }) => void) => {
    if (socket) {
      socket.on('config-updated', callback);
    }
  };

  const offConfigUpdated = (callback: (data: { profileId: string; config: PageProfile['config'] }) => void) => {
    if (socket) {
      socket.off('config-updated', callback);
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        joinProfile,
        leaveProfile,
        updateConfig,
        onConfigUpdated,
        offConfigUpdated,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
