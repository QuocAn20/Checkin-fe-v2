import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WaitingScreenService } from 'src/app/service/module/waiting-screen.service';
import { WaitingScreenModalComponent } from './waiting-screen-modal/waiting-screen-modal.component';

@Component({
  selector: 'app-waiting-screen',
  templateUrl: './waiting-screen.component.html',
  styleUrls: ['./waiting-screen.component.scss'],
})
export class WaitingScreenComponent {
  form: any;
  listWScreen: Array<any> = [];
  listDate: Array<any> = [];

  totalSize = 0;
  pageSize = 10;
  pageNumber = 1;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private wScreenService: WaitingScreenService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getWScreen();
  }

  initForm() {
    this.form = this.formBuilder.group({
      showType: [null],
      notification: [null],
    });
  }

  get f() {
    return this.form.controls;
  }

  getWScreen() {
    const json = {
      page: this.pageNumber,
      limit: this.pageSize,
      ...this.form.value,
    };
    this.wScreenService.getWScreen(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listWScreen = res.data;
        this.totalSize = res.totalRecord;
      }
    });
  }

  refresh() {
    this.ngOnInit();
  }

  search() {
    this.getWScreen();
  }

  openWScreenModal(item: any, type: any) {
    const modalRef = this.modalService.open(WaitingScreenModalComponent, {
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
      this.getWScreen();
    });
  }

  changePageSize(item: any) {
    this.pageSize = item;
    this.getWScreen();
  }

  changePage(size: any) {
    this.pageNumber = size;
    this.getWScreen();
  }
}
