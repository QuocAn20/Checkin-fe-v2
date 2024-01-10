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
import { UnitModalComponent } from './unit/unit-modal/unit-modal.component';
import { HolidayModalComponent } from './holiday/holiday-modal/holiday-modal.component';
import { EventModalComponent } from './event/event-modal/event-modal.component';
import { NotificationModalComponent } from './notification/notification-modal/notification-modal.component';
import { WaitingScreenModalComponent } from './waiting-screen/waiting-screen-modal/waiting-screen-modal.component';
import { PagesModule } from "../../../shares/share.mudule";


@NgModule({
    declarations: [
        RoomComponent,
        UnitComponent,
        HolidayComponent,
        EventComponent,
        NotificationComponent,
        WaitingScreenComponent,
        RoomModalComponent,
        UnitModalComponent,
        HolidayModalComponent,
        EventModalComponent,
        NotificationModalComponent,
        WaitingScreenModalComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        NgSelectModule,
        FormsModule,
        QRCodeModule,
        NgbPagination,
        NgxScannerQrcodeModule,
        ManageCategoryRoutingModule,
        PagesModule
    ]
})

export class ManageCategoryModule{}