import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  { 
    path: 'login', component: LoginPageComponent
  },
];

export const AuthRoutingModule = RouterModule.forChild(routes);