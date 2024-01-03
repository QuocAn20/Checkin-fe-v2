import { RouteInfo } from './../../layout/sidebar/sidebar.component';
import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
} from '@angular/router';
import { AuthService } from 'src/app/service/module/auth.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
  [x: string]: any;
  constructor(private router: Router, private authService: AuthService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    try {
      const currentUser = await this.authService.currentUser();

      if (currentUser) {
        return true;
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }

    this.router.navigate(['/login']);
    return false;
  }
}
