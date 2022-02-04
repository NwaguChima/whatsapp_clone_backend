import { Server } from 'socket.io';
import { server } from '../server';

export const io = new Server(server);

io.on('connection', () => {
  console.log('New webSocket Connection.......');
});
