import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginPageComponent } from "./login-page/login-page.component";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
    declarations: [
        LoginPageComponent,
        ForgotPasswordComponent, 
    ],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      AuthRoutingModule
    ]
})
export class AuthModule { }