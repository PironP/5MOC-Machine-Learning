import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SocketService } from './services/socket.service';

@Injectable({
  providedIn: 'root'
})
export class Routeguard implements CanActivate {

  constructor(private socketService: SocketService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.socketService.gameStatus === 'gameStarted') {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

}
