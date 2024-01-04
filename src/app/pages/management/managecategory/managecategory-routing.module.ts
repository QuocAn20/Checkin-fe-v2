import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/cors/guards/auth.guard';
import { RoomComponent } from './room/room.component';
import { UnitComponent } from './unit/unit.component';
import { HolidayComponent } from './holiday/holiday.component';
import { EventComponent } from './event/event.component';
import { NotificationComponent } from './notification/notification.component';
import { WaitingScreenComponent } from './waiting-screen/waiting-screen.component';

const routes: Routes = [
  {
    path: "room",
    component: RoomComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "unit",
    component: UnitComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "holiday",
    component: HolidayComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "event",
    component: EventComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "notification",
    component: NotificationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "waiting-screen",
    component: WaitingScreenComponent,
    canActivate: [AuthGuard]
  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageCategoryRoutingModule { }