import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RoomService } from 'src/app/service/module/room.service';
import { SuggestionService } from 'src/app/service/module/suggestion.service';
import { UnitService } from 'src/app/service/module/unit.service';
import { createFileType, downLoadFile } from 'src/app/utils/export.util';

@Component({
  selector: 'app-feed-back',
  templateUrl: './feed-back.component.html',
  styleUrls: ['./feed-back.component.scss']
})
export class FeedBackComponent implements OnInit{

  form: any;
  listSuggest: Array<any> = [];
  listRoom: Array<any> = [];
  listUnit: Array<any> = [];

  totalSize = 0;
  pageSize = 10;
  pageNumber = 1;

  listStatus = [
    {
      status: 'Active',
    },
    {
      status: 'InActive',
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private suggestService: SuggestionService,
    private roomService: RoomService,
    private unitService: UnitService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getSuggest();
    this.getRoom();
    this.getUnit();
  }

  initForm() {
    this.form = this.formBuilder.group({
      room: [null],
      createDate: [null],
      unit: [null],
      status: [null],
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
    this.suggestService.getCountSuggest(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listSuggest = res.data;
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

  getUnit() {
    const json = {
      status: 'Active'
    };
    this.unitService.getUnit(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listUnit = res.data.map((e: any) => e.name);
      }
    });
  }

  export() {
    const json = {
      fileType: 'pdf',
    };
    this.suggestService.export(json).subscribe(
      (res) => {
        if (res) {
          downLoadFile(
            res,
            createFileType(json.fileType),
            'Feedback_' + new Date().toDateString()
          );
        }
      },
      (error) => {
        this.toastService.error('Export error', 'Error');
      }
    );
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
