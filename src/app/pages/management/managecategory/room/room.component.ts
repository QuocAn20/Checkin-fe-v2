import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoomService } from 'src/app/service/module/room.service';
import { RoomModalComponent } from './room-modal/room-modal.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit{

  form: any;
  listRoom: Array<any> = [];

  totalSize = 0;
  pageSize = 10;
  pageNumber = 1;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getRoom();
  }

  initForm(){
    this.form = this.formBuilder.group({
      name: [null],
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
