import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/cors/guards/auth.guard';
import { FeedBackComponent } from './feed-back/feed-back.component';
import { ReportRegisterComponent } from './report-register/report-register.component';
import { ReportComponent } from './report/report.component';
import { InOutComponent } from './in-out/in-out.component';

const routes: Routes = [
  {
    path: "in-out",
    component: InOutComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: "unit",
  //   component: UnitComponent,
  //   canActivate: [AuthGuard]
  // },
  {
    path: "register",
    component: ReportRegisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "feedback",
    component: FeedBackComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "report",
    component: ReportComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageStatisticRoutingModule { }