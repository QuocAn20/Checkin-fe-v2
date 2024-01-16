import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ROUTES } from '../sidebar/sidebar.component';
import { AuthService } from 'src/app/service/module/auth.service';
import { CheckInOutService } from 'src/app/service/module/checkinout.service';
import { ToastrService } from 'ngx-toastr';
import { base64DecodeUnicode } from 'src/app/utils/convert.util';
import { LoginConfigService } from 'src/app/service/module/login-config.service';
import { interval, takeWhile } from 'rxjs';

@Component({
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html',
})
export class NavbarComponent implements OnInit {
  location: Location;
  private nativeElement: Node;
  private toggleButton: any;
  private sidebarVisible: boolean;
  counter = 0;
  listNotification: Array<any> = [];
  listAuthData: any;
  timeOut: any;

  public isCollapsed = true;
  @ViewChild('navbar-cmp', { static: false }) button: any;
  currentUser: any;

  listTitles: any;

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private authService: AuthService,
    private loginConfigService: LoginConfigService,
    private checkInOutService: CheckInOutService,
    private toastService: ToastrService
  ) {
    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter((listTitles: any) => listTitles);
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
    });
    this.currentUser = this.authService.currentUser().userId;
    this.getTimeOut();
    this.startCountdown();
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }
    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName('main-panel')[0]
    );
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }
    this.sidebarVisible = true;
  }
  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName('main-panel')[0]
    );
    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = '';
      }, 500);
    }
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  }
  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    console.log(navbar);
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }
  }

  show(menu: any) {
    const menuElement = document.getElementsByClassName(menu.className)[0];
    if (menuElement) {
      menuElement.classList.toggle('show');
    }
  }

  getIdFromToken(): any {
    if (sessionStorage.getItem('remember')) {
      this.listAuthData = JSON.parse(
        base64DecodeUnicode(sessionStorage.getItem('remember'))
      );
      return this.listAuthData;
    }
  }

  getDate() {
    const d = new Date();
    const month =
      d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
    const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    return d.getFullYear() + '-' + month + '-' + day;
  }

  logout() {
    const json = {
      id: this.getIdFromToken().currentUser.userId,
      date: this.getDate(),
      status: 'Valid',
      role: this.getIdFromToken().currentUser.role
    };
    if(json.role == 'ADMIN'){
      this.authService.logout();
    }else{
      this.checkInOutService.updateInOut(json).subscribe((res) => {
        if (res.errorCode === '0') {
          this.toastService.success(res.errorDesc, 'Success');
          this.authService.logout();
        } else {
          this.toastService.error(res.errorDesc, 'Error');
        }
      });
    }
  }

  getTimeOut() {
    this.loginConfigService.getLConfig({}).subscribe((res) => {
      this.timeOut = res.data.timeInLogin;
    });
  }

  startCountdown() {
    // Create an observable that emits every second
    const countdown$ = interval(1000);

    // Subscribe to the countdown observable
    countdown$
      .pipe(
        // Use the takeWhile operator to continue counting down until the timeOut value is greater than 0
        takeWhile(() => this.timeOut > 0)
      )
      .subscribe(() => {
        // Decrease the timeOut value by 1 second
        this.timeOut--;

        // Check if the countdown has reached zero
        if (this.timeOut === 0) {
          // Handle timeout actions here
          console.log('Timeout reached!');
          this.logout();
          // Perform any additional actions when the timeout occurs
        }
      });
  }
}
