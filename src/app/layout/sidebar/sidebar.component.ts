import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/module/auth.service';
import { MenuService } from 'src/app/service/module/menu.service';

export interface RouteInfo {
  path: string;
  title: string;
}

export const ROUTES: RouteInfo[] = [
  {
    path: '/pages/management/dashboard',
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
    path: '/management/ticket',
    title: 'Ticket',
  },
  {
    path: '/management/screen',
    title: 'Screen',
  },
  {
    path: '/pages/management/menu',
    title: 'Menu',
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
];

@Component({
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
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
}
