import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/cors/guards/auth.guard';
import { MenuComponent } from './menu/menu.component';
import { LoginConfigComponent } from './login-config/login-config.component';

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
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemConfigRoutingModule { }