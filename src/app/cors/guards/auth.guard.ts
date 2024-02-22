import { RouteInfo } from './../../layout/sidebar/sidebar.component';
import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/module/auth.service';
import { CheckInOutService } from 'src/app/service/module/checkinout.service';
import { base64DecodeUnicode } from 'src/app/utils/convert.util';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  listAuthData: any;
  startTime: any;
  endTime: any;

  [x: string]: any;
  constructor(
    private checkInOutService: CheckInOutService,
    private router: Router,
    private authService: AuthService,
    public toastService: ToastrService
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    try {
      const currentUser = await this.authService.currentUser();

      if (currentUser) {
        if (this.authService.currentUser().role == 'ADMIN') {
          return true;
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
    this.logout();
    this.router.navigate(['']);
    this.toastService.error('You must be ADMIN to using this', 'Error');
    return false;
  }

  logout() {
    const json = {
      id: this.getIdFromToken().currentUser.userId,
      date: this.getDate(),
      status: 'Valid',
      role: this.getIdFromToken().currentUser.role,
      startTime: this.startTime,
      endTime: this.endTime,
    };
    this.checkInOutService.updateInOut(json).subscribe((res) => {
      console.log(res);

      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc, 'Success');
        this.authService.logout();
      } else {
        this.toastService.error(res.errorDesc, 'Error');
      }
    });
  }

  getDate() {
    const d = new Date();
    const month =
      d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
    const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    return d.getFullYear() + '-' + month + '-' + day;
  }

  getIdFromToken(): any {
    if (sessionStorage.getItem('remember')) {
      this.listAuthData = JSON.parse(
        base64DecodeUnicode(sessionStorage.getItem('remember'))
      );
      return this.listAuthData;
    }
  }
}
