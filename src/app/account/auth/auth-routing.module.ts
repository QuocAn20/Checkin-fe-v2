import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  { 
    path: '', component: LoginPageComponent
  },
  {
    path: 'forgot', component: ForgotPasswordComponent
  }
];

export const AuthRoutingModule = RouterModule.forChild(routes);