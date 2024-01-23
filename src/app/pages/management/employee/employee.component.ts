import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from 'src/app/service/module/employee.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { EmployeeModalComponent } from './employee-modal/employee-modal.component';
import { RoomService } from 'src/app/service/module/room.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  form: any;
  listRole: any;
  listEmployee: Array<any> = [];
  listRoom: Array<any> = [];

  totalSize = 0;
  pageSize = 10;
  pageNumber = 1;

  listPosition =[
    {
      position: 'Employee'
    },
    {
      position: 'Manager'
    }
  ]

  listGender =[
    {
      gender: 'Male'
    },
    {
      gender: 'Female'
    },
    {
      gender: 'Other'
    }
  ]

  listStatus =[
    {
      status: 'Active'
    },
    {
      status: 'InActive'
    },
  ]

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private employeeService: EmployeeService,
    private roomService: RoomService,
    public toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getEmployee();
    this.getRoom();
    // this.getRole();
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

  getRoom() {
    const json = {
      status: 'Active'
    };
    this.roomService.getRoom(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listRoom = res.data.map((e: any) => e.name);
      }
    });
  }

  getEmployee() {
    const json = {
      page: this.pageNumber,
      limit: this.pageSize,
      ...this.form.value,
    };
    this.employeeService.getEmployee(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listEmployee = res.data;
        this.totalSize = res.totalRecord;
      }
    });
  }

  // getRole() {
  //   this.serviceBankingService.getService({}).subscribe((res) => {
  //     if (res.errorCode === '0') {
  //       this.listRole = res.data;
  //     }
  //   });
  // }

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
    modalRef.componentInstance.listEmployee = this.listEmployee;
    modalRef.componentInstance.listRoom = this.listRoom;
    modalRef.componentInstance.listPosition = this.listPosition;
    modalRef.componentInstance.listGender = this.listGender;
    modalRef.componentInstance.listStatus = this.listStatus;

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
