import SocketIOClientStatic from 'socket.io-client';

declare global {
  interface Window { socket: SocketIOClientStatic['Socket']; }
}

export {};