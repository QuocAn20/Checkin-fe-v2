import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/service/module/notification.service';
import { NotificationModalComponent } from './notification-modal/notification-modal.component';
import { HolidayService } from 'src/app/service/module/holiday.service';
import { EventService } from 'src/app/service/module/event.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit{

  form: any;
  listNotification: Array<any> = [];
  listDate: Array<any> = [];
  listNotiType: Array<any> = [];

  listObject = [
    {
      object: 'All'
    },
    {
      object: 'Room'
    },
    {
      object: 'Unit'
    },
    {
      object: 'Individual'
    }
  ]

  totalSize = 0;
  pageSize = 10;
  pageNumber = 1;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private notificationService: NotificationService,
    private holidayService: HolidayService,
    private eventService: EventService,
  ) {}

  ngOnInit(): void { 
    this.initForm();   
    this.getNotification();
    this.getNotiType();    
  }

  initForm(){
    this.form = this.formBuilder.group({
      notiType: [null],
      content: [null],
      object: [null],
    });
  }

  get f() {
    return this.form.controls;
  }

  getNotiType(){
    const json = {
      status: "Active"
    };
    this.holidayService.getHoliday(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listNotiType.push(res.data);
        this.listNotiType = this.listNotiType.flat();
      }
    });
    this.eventService.getEvent(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listNotiType.push(res.data);
        this.listNotiType = this.listNotiType.flat();

      }
    });    
  }

  getNotification(){
    const json = {
      page: this.pageNumber,
      limit: this.pageSize,
      ...this.form.value,
    };
    this.notificationService.getNotification(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listNotification = res.data;
        this.totalSize = res.totalRecord;
      }
    });
  }

  refresh() {
    this.ngOnInit();
  }

  search() {
    this.getNotification();
  }

  openNotificationModal(item: any, type: any) {
    const modalRef = this.modalService.open(NotificationModalComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
    });
    if (item) {
      modalRef.componentInstance.item = item;
    }
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.listNotiType = this.listNotiType;
    modalRef.componentInstance.listObject = this.listObject;

    modalRef.componentInstance.passEntry.subscribe((receive: any) => {
      this.modalService.dismissAll();
      this.getNotification();
    });
  }

  changePageSize(item: any) {
    this.pageSize = item;
    this.getNotification();
  }

  changePage(size: any) {
    this.pageNumber = size;
    this.getNotification();
  }
}
