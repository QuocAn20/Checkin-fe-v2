import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/module/auth.service';
import { MenuService } from 'src/app/service/module/menu.service';

export interface RouteInfo {
  path: string;
  title: string;
}

export const ROUTES: RouteInfo[] = [
  {
    path: '/pages/management/home-page',
    title: 'Home',
  },
  {
    path: '/pages/management/service',
    title: 'Management Form',
  },
  {
    path: '/pages/management/employee',
    title: 'Employees',
  },
  {
    path: '/pages/management/manageform',
    title: 'Form Management',
  },
  {
    path: '/pages/management/manageform/survey',
    title: 'Survey',
  },
  {
    path: '/pages/management/manageform/register',
    title: 'Register',
  },
  {
    path: '/pages/management/managecategory',
    title: 'Category Management',
  },
  {
    path: '/pages/management/managecategory/room',
    title: 'Room',
  },
  {
    path: '/pages/management/managecategory/event',
    title: 'Event',
  },
  {
    path: '/pages/management/managecategory/holiday',
    title: 'Holiday',
  },
  {
    path: '/pages/management/managecategory/unit',
    title: 'Unit',
  },
  {
    path: '/pages/management/managecategory/notification',
    title: 'Notification',
  },
  {
    path: '/pages/management/managecategory/waiting-screen',
    title: 'Waiting Screen',
  },
  {
    path: '/pages/management/managestatistic',
    title: 'Statistic Management',
  },
  {
    path: '/pages/management/managestatistic/in-out',
    title: 'In/Out',
  },
  {
    path: '/pages/management/managestatistic/feedback',
    title: 'Feedback',
  },
  {
    path: '/pages/management/suggest',
    title: 'Suggestion Box',
  },
  {
    path: '/pages/management/systemconfig',
    title: 'System Config',
  },
  {
    path: '/pages/management/systemconfig/menu',
    title: 'Menu',
  },
  {
    path: '/pages/management/systemconfig/login-config',
    title: 'Login Config',
  },
  {
    path: '/pages/management/systemconfig/work-time',
    title: 'Working Time',
  },
  {
    path: '/pages/management/systemconfig/language',
    title: 'Language',
  },
  {
    path: '/pages/management/systemconfig/password-config',
    title: 'Password Config',
  },
  {
    path: '/pages/management/systemconfig/changed-password',
    title: 'Changed Password',
  },
  {
    path: '/pages/management/systemconfig/decentralization',
    title: 'Decentralization',
  },
];

@Component({
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  public menuItems: Array<any> = [];
  listMenu: Array<any> = [];
  role: any;

  constructor(
    private menuService: MenuService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.role = this.authService.currentUser().role;
    this.getMenu();
  }

  getMenu() {
    const json = {
      roleCode: [this.role],
    };

    this.menuService.getMenuByRole(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listMenu = res.data;
      }
    });
  }

  getState(currentMenu: any) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }
}
