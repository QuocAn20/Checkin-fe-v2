import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from 'src/app/service/module/event.service';
import { EventModalComponent } from './event-modal/event-modal.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit{

  form: any;
  listEvent: Array<any> = [];
  listDate: Array<any> = [];

  totalSize = 0;
  pageSize = 10;
  pageNumber = 1;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getEvent();
  }

  initForm(){
    this.form = this.formBuilder.group({
      name: [null],
      startDate: [null],
      endDate: [null],
      startTime: [null],
      endTime: [null],
    });
  }

  get f() {
    return this.form.controls;
  }

  getEvent(){
    const json = {
      page: this.pageNumber,
      limit: this.pageSize,
      ...this.form.value,
    };
    this.eventService.getEvent(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listEvent = res.data;
        this.totalSize = res.totalRecord;
      }
    });
  }

  refresh() {
    this.ngOnInit();
  }

  search() {
    this.getEvent();
  }

  openEventModal(item: any, type: any) {
    const modalRef = this.modalService.open(EventModalComponent, {
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
      this.getEvent();
    });
  }

  changePageSize(item: any) {
    this.pageSize = item;
    this.getEvent();
  }

  changePage(size: any) {
    this.pageNumber = size;
    this.getEvent();
  }
}
