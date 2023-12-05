import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PagesRoutingModule } from "./pages-routing.module";
import { LayoutModule } from "../layout/layout.module";
import { ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { TvScreenComponent } from "./tv-screen/tv-screen.component";
import { NotificationComponent } from "./tv-screen/notification/notification.component";
import { BookingComponent } from './booking/booking.component';
import { BookingConfirmComponent } from './booking/booking-confirm/booking-confirm.component';
import { BookingModalComponent } from './booking/booking-modal/booking-modal.component';
import { CommentModalComponent } from './booking/comment-modal/comment-modal.component';
import { QrcodeGenerationComponent } from './booking/qrcode-generation/qrcode-generation.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PagesRoutingModule,
        LayoutModule,
        ReactiveFormsModule,
        NgSelectModule,
        FormsModule,
        QRCodeModule,
        NgxScannerQrcodeModule
    ],
    declarations: [
        BookingComponent,
        BookingModalComponent,
        QrcodeGenerationComponent,
        TvScreenComponent,
        CommentModalComponent,
        BookingConfirmComponent,
        NotificationComponent
    ]
})

export class PagesModule{}