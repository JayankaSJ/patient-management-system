import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TOKEN_KEY } from '../common/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem(TOKEN_KEY); // Replace with your token's key name

    if (token) {
      // Token exists, allow the route activation
      return true;
    } else {
      // No token, redirect to login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
