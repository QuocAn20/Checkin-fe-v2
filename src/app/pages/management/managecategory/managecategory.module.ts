import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { NgbPagination } from "@ng-bootstrap/ng-bootstrap";
import { ManageCategoryRoutingModule } from "./managecategory-routing.module";
import { RoomComponent } from './room/room.component';
import { UnitComponent } from './unit/unit.component';
import { HolidayComponent } from './holiday/holiday.component';
import { EventComponent } from './event/event.component';
import { NotificationComponent } from './notification/notification.component';
import { WaitingScreenComponent } from './waiting-screen/waiting-screen.component';
import { RoomModalComponent } from './room/room-modal/room-modal.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        NgSelectModule,
        FormsModule,
        QRCodeModule,
        NgbPagination,
        NgxScannerQrcodeModule,
        ManageCategoryRoutingModule
    ],
    declarations: [    
        RoomComponent,
        UnitComponent,
        HolidayComponent,
        EventComponent,
        NotificationComponent,
        WaitingScreenComponent,
        RoomModalComponent
  ]
})

export class ManageCategoryModule{}