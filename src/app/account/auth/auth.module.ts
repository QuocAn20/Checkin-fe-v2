import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginPageComponent } from "./login-page/login-page.component";

@NgModule({
    declarations: [
        LoginPageComponent, 
    ],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      AuthRoutingModule
    ]
})
export class AuthModule { }