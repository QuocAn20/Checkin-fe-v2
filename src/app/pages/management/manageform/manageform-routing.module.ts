import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyComponent } from './survey/survey.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from 'src/app/cors/guards/auth.guard';

const routes: Routes = [
  {
    path: "survey",
    component: SurveyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [AuthGuard]
  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageFormRoutingModule { }