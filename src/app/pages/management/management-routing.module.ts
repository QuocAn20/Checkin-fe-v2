import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { AuthGuard } from 'src/app/cors/guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {
    path: 'employee',
    component: EmployeeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "manageform",
    canActivate: [AuthGuard],
    loadChildren: () => import('./manageform/manageform.module').then(m => m.ManageFormModule)
  },
  {
    path: "managecategory",
    canActivate: [AuthGuard],
    loadChildren: () => import('./managecategory/managecategory.module').then(m => m.ManageCategoryModule)
  },
  {
    path: "managestatistic",
    canActivate: [AuthGuard],
    loadChildren: () => import('./managestatistic/managestatistic.module').then(m => m.ManageStatisticModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
