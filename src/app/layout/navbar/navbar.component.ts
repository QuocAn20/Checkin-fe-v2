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
import { WorkTimeService } from 'src/app/service/module/work-time.service';
import { LanguageConfigService } from 'src/app/service/module/language.service';
import { TranslateService } from '@ngx-translate/core';

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
  startTime: any;
  endTime: any;

  defaultLanguage: any;
  supportLanguage: Array<any> = [];

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
    private workTimeService: WorkTimeService,
    private languageService: LanguageConfigService,
    private toastService: ToastrService,
    private translate: TranslateService
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
    this.getWorkingTime();
    this.getLanguage();
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

  getLanguage(){
    this.languageService.getLanguage({}).subscribe((res) => {
      this.defaultLanguage = res.data[0].defaultLanguage;
      this.supportLanguage = res.data[0].supportLanguage;

      this.translate.setDefaultLang(this.defaultLanguage);
      this.translate.use(this.defaultLanguage);
    });
  }

  translateLanguage(language: any){
    this.translate.use(language);
  }

  logout() {
    const json = {
      id: this.getIdFromToken().currentUser.userId,
      date: this.getDate(),
      status: 'Valid',
      role: this.getIdFromToken().currentUser.role,
      startTime: this.startTime,
      endTime: this.endTime
    };    
    if (json.role == 'ADMIN') {
      this.authService.logout();
    } else {
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
  }

  getWorkingTime() {
    this.workTimeService.getWorkTime({}).subscribe((res) => {
      this.startTime = res.data[0].startTime;
      this.endTime = res.data[0].endTime;
    });
  }

  getTimeOut() {
    this.loginConfigService.getLConfig({}).subscribe((res) => {
      this.timeOut = res.data.timeInLogin;
    });
  }

  startCountdown() {
    const countdown$ = interval(1000);

    countdown$.pipe(takeWhile(() => this.timeOut > 0)).subscribe(() => {
      this.timeOut--;
      if (this.timeOut === 0) {
        console.log('Timeout reached!');
        this.logout();
      }
    });    
  }
}
