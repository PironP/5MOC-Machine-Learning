import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html',
  styleUrls: ['./game-search.component.css']
})
export class GameSearchComponent implements OnInit, OnDestroy {

  private interval: any;

  constructor(
    private socketService: SocketService,
    private router: Router) { }

  ngOnInit() {
    this.socketService.joinGame();
    this.interval = setInterval(() => {
      if (this.socketService.gameStatus === 'gameStarted') {
        this.router.navigateByUrl('/game');
      }
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

}
