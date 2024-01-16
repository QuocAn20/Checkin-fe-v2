import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { PagesModule } from '../../../shares/share.mudule';
import { SystemConfigRoutingModule } from './system-config-routing.module';
import { MenuComponent } from './menu/menu.component';
import { MenuModalComponent } from './menu/menu-modal/menu-modal.component';
import { LoginConfigComponent } from './login-config/login-config.component';
import { ChangedPasswordComponent } from './changed-password/changed-password.component';
import { PasswordConfigComponent } from './password-config/password-config.component';

@NgModule({
  declarations: [
    MenuComponent,
    MenuModalComponent,
    LoginConfigComponent,
    ChangedPasswordComponent,
    PasswordConfigComponent
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
    PagesModule,
    SystemConfigRoutingModule
  ],
})
export class SystemConfigModule {}
