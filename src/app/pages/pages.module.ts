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
    ]
})

export class PagesModule{}