import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PagesModule } from '../../../shares/share.mudule';
import { ManageStatisticRoutingModule } from './managestatistic-routing.module';
import { InOutComponent } from './in-out/in-out.component';
import { ReportRegisterComponent } from './report-register/report-register.component';
import { FeedBackComponent } from './feed-back/feed-back.component';
import { ReportComponent } from './report/report.component';
import { InOutModalComponent } from './in-out/in-out-modal/in-out-modal.component';
import { ManagementModule } from '../management.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    InOutComponent,
    ReportRegisterComponent,
    FeedBackComponent,
    ReportComponent,
    InOutModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    QRCodeModule,
    NgbPaginationModule,
    NgxScannerQrcodeModule,
    ManageStatisticRoutingModule,
    PagesModule,
    ManagementModule,
    TranslateModule
  ],
  exports: [
    InOutComponent
  ]
})
export class ManageStatisticModule {}
