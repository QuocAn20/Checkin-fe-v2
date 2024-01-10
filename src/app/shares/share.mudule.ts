import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LayoutModule } from "../layout/layout.module";
import { ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { GetLabelByIdInArrayToStringPipe } from "./pipes/get-label-by-id-in-array-to-string.pipe";
import { GetLabelByIdInArrayPipe } from "./pipes/get-label-by-id-in-array.pipe";


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        LayoutModule,
        ReactiveFormsModule,
        NgSelectModule,
        FormsModule,
        QRCodeModule,
        NgxScannerQrcodeModule
    ],
    declarations: [
        GetLabelByIdInArrayToStringPipe,
        GetLabelByIdInArrayPipe
    ],
    exports: [
        GetLabelByIdInArrayToStringPipe,
        GetLabelByIdInArrayPipe
    ]
})

export class PagesModule{}