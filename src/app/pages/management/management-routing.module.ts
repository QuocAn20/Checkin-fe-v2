import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { AuthGuard } from 'src/app/cors/guards/auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { SuggestionBoxComponent } from './suggestion-box/suggestion-box.component';

const routes: Routes = [
  {
    path: 'employee',
    component: EmployeeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home-page',
    component: HomePageComponent,
  },
  {
    path: 'suggest',
    component: SuggestionBoxComponent,
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
    loadChildren: () => import('./managestatistic/managestatistic.module').then(m => m.ManageStatisticModule)
  },
  {
    path: "systemconfig",
    loadChildren: () => import('./system-config/system-config.module').then(m => m.SystemConfigModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
