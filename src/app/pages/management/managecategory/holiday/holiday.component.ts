import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HolidayService } from 'src/app/service/module/holiday.service';
import { HolidayModalComponent } from './holiday-modal/holiday-modal.component';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit{

  form: any;
  listHoliday: Array<any> = [];
  listDate: Array<any> = [];

  totalSize = 0;
  pageSize = 10;
  pageNumber = 1;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private holidayService: HolidayService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getHoliday();
  }

  initForm(){
    this.form = this.formBuilder.group({
      name: [null],
      date: [null],
    });
  }

  get f() {
    return this.form.controls;
  }

  getHoliday(){
    const json = {
      page: this.pageNumber,
      limit: this.pageSize,
      ...this.form.value,
    };
    this.holidayService.getHoliday(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listHoliday = res.data;
        this.totalSize = res.totalRecord;
      }
    });
  }

  refresh() {
    this.ngOnInit();
  }

  search() {
    this.getHoliday();
  }

  openHolidayModal(item: any, type: any) {
    const modalRef = this.modalService.open(HolidayModalComponent, {
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
      this.getHoliday();
    });
  }

  changePageSize(item: any) {
    this.pageSize = item;
    this.getHoliday();
  }

  changePage(size: any) {
    this.pageNumber = size;
    this.getHoliday();
  }
}
