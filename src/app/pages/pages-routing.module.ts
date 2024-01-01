import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { LayoutComponent } from '../layout/layout.component';
import { TvScreenComponent } from './tv-screen/tv-screen.component';

const routes: Routes = [
  {
    path: "booking", component: BookingComponent
  },
  {
    path: "tv", component: TvScreenComponent
  },
  {
    path: "management", component: LayoutComponent, loadChildren: () => import('./management/management.module').then(m => m.ManagementModule)
  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }