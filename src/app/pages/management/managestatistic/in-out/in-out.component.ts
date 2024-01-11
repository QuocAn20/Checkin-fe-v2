import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckInOutService } from 'src/app/service/module/checkinout.service';
import { InOutModalComponent } from './in-out-modal/in-out-modal.component';
import { createFileType, downLoadFile } from 'src/app/utils/export.util';
import { ToastrService } from 'ngx-toastr';
import { RoomService } from 'src/app/service/module/room.service';
import { UnitService } from 'src/app/service/module/unit.service';

@Component({
  selector: 'app-in-out',
  templateUrl: './in-out.component.html',
  styleUrls: ['./in-out.component.scss']
})
export class InOutComponent implements OnInit{

  form: any;
  listCheckIn: Array<any> = [];

  totalSize = 0;
  pageSize = 5;
  pageNumber = 1;

  listRoom: Array<any> = [];
  listUnit: Array<any> = [];
  listStatus =[
    {
      status: 'Valid'
    },
    {
      status: 'InValid'
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private roomService: RoomService,
    private unitService: UnitService,
    private checkInOutService: CheckInOutService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getInOut();
    this.getRoom();
    this.getUnit();
  }

  initForm(){
    this.form = this.formBuilder.group({
      room: [null],
      date: [null],
      unit: [null],
      status: [null]
    });
  }

  get f() {
    return this.form.controls;
  }

  getRoom(){
    const json = {
      status: 'Active'
    };
    this.roomService.getRoom(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listRoom = res.data.map((e: any) => e.name);
      }
    });
  }

  getUnit(){
    const json = {
      status: 'Active'
    };
    this.unitService.getUnit(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listUnit = res.data.map((e: any) => e.name);
      }
    });
  }

  getInOut(){
    const json = {
      page: this.pageNumber,
      limit: this.pageSize,
      ...this.form.value,
    };
    this.checkInOutService.getInOut(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listCheckIn = res.data;
        this.totalSize = res.totalRecord;
      }
    });
  }

  refresh() {
    this.ngOnInit();
  }

  search() {
    this.getInOut();
  }

  export() {
    const json = {
      fileType: 'pdf',
    };
    this.checkInOutService.export(json).subscribe(
      (res) => {
        if (res) {
          downLoadFile(
            res,
            createFileType(json.fileType),
            'CheckInOut_' + new Date().toDateString()
          );
        }
      },
      (error) => {
        this.toastService.error('Export error', 'Error');
      }
    );
  }

  openInOutModal(item: any, type: any) {
    const modalRef = this.modalService.open(InOutModalComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
    });
    if (item) {
      modalRef.componentInstance.item = item;
    }
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.listCheckIn = this.listCheckIn

    modalRef.componentInstance.passEntry.subscribe((receive: any) => {
      this.modalService.dismissAll();
      this.getInOut();
    });
  }

  changePageSize(item: any) {
    this.pageSize = item;
    this.getInOut();
  }

  changePage(size: any) {
    this.pageNumber = size;
    this.getInOut();
  }
}
