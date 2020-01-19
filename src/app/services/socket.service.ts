import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  gameStatus = 'searching';

  constructor(private socket: Socket) {
    socket.on('gameOn', () => {
      console.log('Start Game');
      this.gameStatus = 'gameStarted';
    });
  }

  joinGame() {
    if (!this.socket.ioSocket.connected) {
      this.socket.connect();
    }
    this.socket.emit('play');
  }

  sendMove(move: string) {
    this.socket.emit('choice',  move);
  }

  gameEnded() {
    this.gameStatus = 'searching';
    this.socket.disconnect();
  }
}
