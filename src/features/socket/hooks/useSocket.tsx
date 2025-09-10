import { useEffect } from 'react';
import { useUser, WEB_SOCKET_URL } from '../../../shared';
import { io, Socket } from 'socket.io-client';
import { ClientEvents, ServerEvents } from '../types';

export const useSocket = (callback: (data: string) => void) => {
  const { tokens } = useUser();

  const socket: Socket<ServerEvents, ClientEvents> | null = tokens
    ? io(WEB_SOCKET_URL, {
        transports: ['websocket'], // skip long polling
        withCredentials: true, // if your API uses cookies/CORS
        auth: { token: tokens.wsToken },
      })
    : null;

  useEffect(() => {
    if (!tokens || !socket) return;

    socket.on('connect', () => {
      console.log('✅ Connected:', socket.id);
      socket.emit('hello', { from: 'react-client' });
    });

    socket.on('message', (data) => {
      console.log('📩 Message:', data);
      callback(data);
    });

    socket.on('disconnect', (reason) => {
      console.log('❌ Disconnected:', reason);
    });

    socket.on('connect_error', (err) => {
      console.error('⚠️ Connection Error:', err.message);
    });

    return () => {
      socket.off('connect');
      socket.off('message');
      socket.off('disconnect');
      socket.off('connect_error');
      socket.disconnect();
    };
  }, [tokens]);

  return { socket };
};
