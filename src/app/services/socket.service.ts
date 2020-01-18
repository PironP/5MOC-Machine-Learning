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
    this.socket.emit('play');
  }

  sendMove(move: string) {
    this.socket.emit('choice',  move);
  }
}
