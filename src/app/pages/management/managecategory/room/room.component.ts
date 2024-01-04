import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RoomService } from 'src/app/service/module/room.service';
import { RoomModalComponent } from './room-modal/room-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit{

  form: any;
  listRoom: Array<any> = [];
  listBranch: Array<any> = [];

  totalSize = 0;
  pageSize = 10;
  pageNumber = 1;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getRoom();
  }

  initForm(){
    this.form = this.formBuilder.group({
      room: [null],
      branch: [null],
    });
  }

  get f() {
    return this.form.controls;
  }

  getRoom(){
    const json = {
      page: this.pageNumber,
      limit: this.pageSize,
      ...this.form.value,
    };
    this.roomService.getRoom(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listRoom = res.data;
        this.totalSize = res.totalRecord;
      }
    });
  }

  refresh() {
    this.ngOnInit();
  }

  search() {
    this.getRoom();
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
          this.roomService.deleteRoom(json).subscribe(
            (res) => {
              if (res.errorCode === '0') {
                this.toastService.success(res.errorDesc, 'Success');
                this.getRoom();
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

  openRoomModal(item: any, type: any) {
    const modalRef = this.modalService.open(RoomModalComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
    });
    if (item) {
      modalRef.componentInstance.item = item;
    }
    modalRef.componentInstance.type = type;

    modalRef.componentInstance.passEntry.subscribe((receive: any) => {
      this.modalService.dismissAll();
      this.getRoom();
    });
  }

  changePageSize(item: any) {
    this.pageSize = item;
    this.getRoom();
  }

  changePage(size: any) {
    this.pageNumber = size;
    this.getRoom();
  }

}
