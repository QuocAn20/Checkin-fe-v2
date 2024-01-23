import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RoomService } from 'src/app/service/module/room.service';
import { SuggestionService } from 'src/app/service/module/suggestion.service';
import { SuggestionBoxModalComponent } from './suggestion-box-modal/suggestion-box-modal.component';

@Component({
  selector: 'app-suggestion-box',
  templateUrl: './suggestion-box.component.html',
  styleUrls: ['./suggestion-box.component.scss'],
})
export class SuggestionBoxComponent implements OnInit {
  form: any;
  listSuggest: Array<any> = [];
  listRoom: Array<any> = [];

  totalSize = 0;
  pageSize = 10;
  pageNumber = 1;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private suggestService: SuggestionService,
    private roomService: RoomService,
    public toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getSuggest();
    this.getRoom();
  }

  initForm() {
    this.form = this.formBuilder.group({
      code: [null],
      name: [null],
      creator: [null],
      room: [null],
      createDate: [null],
    });
  }

  get f() {
    return this.form.controls;
  }

  refresh() {
    this.ngOnInit();
  }

  search() {
    this.getSuggest();
  }

  getSuggest() {
    const json = {
      page: this.pageNumber,
      limit: this.pageSize,
      ...this.form.value,
    };
    this.suggestService.getSuggest(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listSuggest = res.data;
        this.totalSize = res.totalRecord;
      }
    });
  }

  getRoom() {
    const json = {
      status: 'Active',
    };
    this.roomService.getRoom(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listRoom = res.data.map((e: any) => e.name);        
      }
    });
  }

  openSuggestModal(item: any, type: any) {
    const modalRef = this.modalService.open(SuggestionBoxModalComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
    });
    if (item) {
      modalRef.componentInstance.item = item;
    }
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.listRoom = this.listRoom;
    modalRef.componentInstance.passEntry.subscribe((receive: any) => {
      this.modalService.dismissAll();
      this.getSuggest();
    });
  }

  changePageSize(item: any) {
    this.pageSize = item;
    this.getSuggest();
  }

  changePage(size: any) {
    this.pageNumber = size;
    this.getSuggest();
  }
}
