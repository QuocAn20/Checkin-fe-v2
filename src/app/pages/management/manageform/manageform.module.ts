import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { RegisterComponent } from "./register/register.component";
import { SurveyComponent } from "./survey/survey.component";
import { ManageFormRoutingModule } from "./manageform-routing.module";
import { SurveyModalComponent } from './survey/survey-modal/survey-modal.component';
import { RegisterModalComponent } from './register/register-modal/register-modal.component';
import { NgbPagination } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";


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
        ManageFormRoutingModule,
        TranslateModule
    ],
    declarations: [
        RegisterComponent,
        SurveyComponent,
        SurveyModalComponent,
        RegisterModalComponent
    ]
})

export class ManageFormModule{}