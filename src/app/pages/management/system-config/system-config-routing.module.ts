import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/cors/guards/auth.guard';
import { MenuComponent } from './menu/menu.component';
import { LoginConfigComponent } from './login-config/login-config.component';
import { ChangedPasswordComponent } from './changed-password/changed-password.component';
import { PasswordConfigComponent } from './password-config/password-config.component';
import { WorkingTimeComponent } from './working-time/working-time.component';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login-config',
    component: LoginConfigComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'work-time',
    component: WorkingTimeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'password-config',
    component: PasswordConfigComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'changed-password',
    component: ChangedPasswordComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemConfigRoutingModule { }