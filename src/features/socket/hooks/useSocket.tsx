import { useEffect, useRef } from 'react';
import { useAppDispatch, useUser, WEB_SOCKET_URL } from '../../../shared';
import { io, Socket } from 'socket.io-client';
import { ClientEvents, ServerEvents } from '../types';
import { setTapToken } from '../../../entities';

export const useSocket = (
  onNewTapToken: () => void,
  onTokenError: () => void,
) => {
  const dispatch = useAppDispatch();
  const { tokens } = useUser();

  const socketRef = useRef<Socket<ServerEvents, ClientEvents> | null>(null);
  const hadErrorRef = useRef<boolean>(false);

  useEffect(() => {
    if (!tokens) return;

    socketRef.current = io(WEB_SOCKET_URL, {
      transports: ['websocket'],
      withCredentials: true,
      query: { token: tokens.wsToken },
    });

    socketRef.current.on('connect', () => {
      socketRef.current!.emit('initTap');
    });

    socketRef.current.on('newTapToken', (data) => {
      dispatch(setTapToken(data.tapToken));
      if (hadErrorRef.current) {
        hadErrorRef.current = false;
        onTokenError();
      } else {
        onNewTapToken();
      }
    });

    socketRef.current.on('error', (data) => {
      if (data === 'Invalid or expired token') {
        hadErrorRef.current = true;
        socketRef.current!.emit('initTap');
      }
    });

    return () => {
      socketRef.current!.off('connect');
      socketRef.current!.off('newTapToken');
      socketRef.current!.off('error');

      socketRef.current!.disconnect();
    };
  }, [tokens?.wsToken]);

  return { socketRef };
};
