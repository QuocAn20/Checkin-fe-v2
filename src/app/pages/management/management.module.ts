import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ManagementRoutingModule } from './management-routing.module';
import { EmployeeComponent } from './employee/employee.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgSelectModule } from '@ng-select/ng-select';
import { EmployeeModalComponent } from './employee/employee-modal/employee-modal.component';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { SuggestionBoxComponent } from './suggestion-box/suggestion-box.component';
import { SuggestionBoxModalComponent } from './suggestion-box/suggestion-box-modal/suggestion-box-modal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    ManagementRoutingModule,
    NgxDropzoneModule,
    NgSelectModule,
    NgxScannerQrcodeModule,
    NgApexchartsModule,
    NgbModule,
    TranslateModule
  ],
  declarations: [
    EmployeeComponent,
    EmployeeModalComponent,
    DashboardComponent,
    PieChartComponent,
    HomePageComponent,
    SuggestionBoxComponent,
    SuggestionBoxModalComponent
  ], 
  exports: [
    DashboardComponent,
    PieChartComponent
  ]
})
export class ManagementModule {}
