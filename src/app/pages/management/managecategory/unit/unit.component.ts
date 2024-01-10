import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UnitService } from 'src/app/service/module/unit.service';
import { UnitModalComponent } from './unit-modal/unit-modal.component';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit{

  form: any;
  listUnit: Array<any> = [];

  totalSize = 0;
  pageSize = 10;
  pageNumber = 1;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private unitService: UnitService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getUnit();
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

  getUnit(){
    const json = {
      page: this.pageNumber,
      limit: this.pageSize,
      ...this.form.value,
    };
    this.unitService.getUnit(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listUnit = res.data;
        this.totalSize = res.totalRecord;
      }
    });
  }

  refresh() {
    this.ngOnInit();
  }

  search() {
    this.getUnit();
  }

  openUnitModal(item: any, type: any) {
    const modalRef = this.modalService.open(UnitModalComponent, {
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
      this.getUnit();
    });
  }

  changePageSize(item: any) {
    this.pageSize = item;
    this.getUnit();
  }

  changePage(size: any) {
    this.pageNumber = size;
    this.getUnit();
  }

}
