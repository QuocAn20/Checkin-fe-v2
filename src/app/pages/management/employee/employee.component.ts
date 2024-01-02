import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from 'src/app/service/module/employee.service';
import { FormBuilder } from '@angular/forms';
import { ServiceBankingService } from 'src/app/service/module/service-banking.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { EmployeeModalComponent } from './employee-modal/employee-modal.component';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  form: any;
  listRole: any;
  listEmployee: Array<any> = [];

  totalSize = 0;
  pageSize = 10;
  pageNumber = 1;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private serviceBankingService: ServiceBankingService,
    private employeeService: EmployeeService,
    public toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getEmployee();
    this.getRole();
    this.getStt(this.listEmployee);
  }

  initForm() {
    this.form = this.formBuilder.group({
      code: [null],
      name: [null],
      gender: [null],
      room: [null],
      position: [null],
      status: [null],
      role: [null],
    });
  }

  get f() {
    return this.form.controls;
  }

  getStt(item: any) {
    let counter = 0;
    for (let i = 0; i < item.length; i++) {
      if (item[i].status === '0') counter++;
    }
  }

  getEmployee() {
    const json = {
      page: this.pageNumber,
      limit: this.pageSize,
      ...this.form.value,
    };

    console.log();

    this.employeeService.getEmployee(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listEmployee = res.data;
        this.totalSize = res.totalRecord;
      }
    });
  }

  getRole() {
    this.serviceBankingService.getService({}).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listRole = res.data;
      }
    });
  }

  refresh() {
    this.ngOnInit();
  }

  search() {
    this.getEmployee();
  }

  delete(item: any) {
    if (item) {
      Swal.fire({
        title: 'Warning!',
        text: 'Are you sure about deleting',
        icon: 'error',
        confirmButtonText: 'OK',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Cancel',
      }).then((res) => {
        if (res.value) {
          const json = {
            id: item.id,
            deleted: 1,
          };
          this.employeeService.deleteEmployee(json).subscribe(
            (res) => {
              if (res.errorCode === '0') {
                this.toastService.success(res.errorDesc, 'Success');
                this.getEmployee();
              } else {
                this.toastService.warning(res.errorDesc, 'Warning');
              }
            },
            (err) => {
              this.toastService.error(err, 'Notification');
            }
          );
        }
      });
      return;
    }
  }

  openEmployeeModal(item: any, type: any) {
    const modalRef = this.modalService.open(EmployeeModalComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
    });
    if (item) {
      modalRef.componentInstance.item = item;
    }

    modalRef.componentInstance.type = type;
    modalRef.componentInstance.listRole = this.listRole;

    modalRef.componentInstance.passEntry.subscribe((receive: any) => {
      this.modalService.dismissAll();
      this.getEmployee();
    });
  }

  changePageSize(item: any) {
    this.pageSize = item;
    this.getEmployee();
  }

  changePage(size: any) {
    this.pageNumber = size;
    this.getEmployee();
  }
}
