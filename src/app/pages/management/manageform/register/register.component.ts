import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/service/module/register.service';
import Swal from 'sweetalert2';
import { RegisterModalComponent } from './register-modal/register-modal.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  form: any;
  listRegister: Array<any> = [];

  totalSize = 0;
  pageSize = 10;
  pageNumber = 1;

  questionType =[
    {
      qType: 'Yes/No'
    },
    {
      qType: 'MultipleChoice'
    },
    {
      qType: 'MultipleAnswers'
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public toastService: ToastrService,
    private registerService: RegisterService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getRegister();
  }

  initForm() {
    this.form = this.formBuilder.group({
      code: [null],
      name: [null],
      startTime: [null],
      endTime: [null],
      questionType: [null]
    });
  }

  get f() {
    return this.form.controls;
  }

  getRegister() {
    const json = {
      page: this.pageNumber,
      limit: this.pageSize,
      ...this.form.value,
    };

    this.registerService.getRegister(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listRegister = res.data;
        this.totalSize = res.totalRecord;
      }
    });
  }

  refresh() {
    this.ngOnInit();
  }

  search() {
    this.getRegister();
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
          this.registerService.deleteRegister(json).subscribe(
            (res) => {
              if (res.errorCode === '0') {
                this.toastService.success(res.errorDesc, 'Success');
                this.getRegister();
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

  openRegisModal(item: any, type: any) {
    const modalRef = this.modalService.open(RegisterModalComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
    });
    if (item) {
      modalRef.componentInstance.item = item;
    }
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.listRegister = this.listRegister;
    modalRef.componentInstance.questionType = this.questionType;
    modalRef.componentInstance.passEntry.subscribe((receive: any) => {
      this.modalService.dismissAll();
      this.getRegister();
    });
  }

  changePageSize(item: any) {
    this.pageSize = item;
    this.getRegister();
  }

  changePage(size: any) {
    this.pageNumber = size;
    this.getRegister();
  }

}
