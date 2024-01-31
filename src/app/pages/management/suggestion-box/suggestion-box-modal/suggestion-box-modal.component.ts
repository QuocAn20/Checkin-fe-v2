import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SuggestionService } from 'src/app/service/module/suggestion.service';
import { base64DecodeUnicode } from 'src/app/utils/convert.util';

@Component({
  selector: 'app-suggestion-box-modal',
  templateUrl: './suggestion-box-modal.component.html',
  styleUrls: ['./suggestion-box-modal.component.scss']
})
export class SuggestionBoxModalComponent implements OnInit{

  @Input() type: any;
  @Input() item: any;
  @Input() listRoom: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  isSubmit = false;

  form: any;
  listAuthData: any;

  suggestType = [
    {
      sgType: 'Căn tin'
    },
    {
      sgType: 'Cơ sở vật chất'
    },
    {
      sgType: 'Khóa học'
    },
    {
      sgType: 'Thời gian làm việc'
    },
    {
      sgType: 'Chính sách hỗ trợ'
    },
    {
      sgType: 'Thời gian nghỉ lễ'
    },
    {
      sgType: 'Nhà xe'
    },
    {
      sgType: 'Phòng ban'
    },
  ]

  listStatus = [
    {
      status: 'Active',
    },
    {
      status: 'InActive',
    },
  ];

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private suggestService: SuggestionService
  ) {}

  ngOnInit(): void {
    this.initform();    
    if(this.item){
      this.form.patchValue(this.item);
    }
  }

  initform(){
    this.form = this.formBuilder.group({
      id: [null],
      code: [null],
      createDate: [null],
      name: [{value: null, disabled: this.type === "view" ? true : false}, [Validators.required]],
      creator: [null],
      room: [null],
      suggestion: [{value: null, disabled: this.type === "view" ? true : false}, [Validators.required]],
      reply: [{value: null, disabled: this.type === "view" ? true : false}],
      note: [{value: null, disabled: this.type === "view" ? true : false}],
      status: [{value: null, disabled: this.type === "view" ? true : false}, [Validators.required]],
      creatorId: [null]
    });
  }

  get f() {
    return this.form.controls;
  }

  close() {
    this.passEntry.emit();
  }

  submit() {
    this.isSubmit = true;
    if (this.form.status === 'INVALID') {
      
      return;
    } else {
      if (this.item) {        
        this.update();
      } else {
        this.create();
      }
    }
    this.isSubmit = false;
  }

  getIdFromToken(): any {
    if (sessionStorage.getItem('remember')) {
      this.listAuthData = JSON.parse(
        base64DecodeUnicode(sessionStorage.getItem('remember'))
      );
      return this.listAuthData;
    }
  }

  create() {
    const json = {
      ...this.form.value,
      creatorId: this.getIdFromToken().currentUser.userId,
    }    
    this.suggestService.createSuggest(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc, 'Success');
        this.passEntry.emit(res);
      } else {
        this.toastService.error(res.errorDesc, 'Error');
      }
    });
  }

  update() {
    this.suggestService.updateSuggest(this.form.value).subscribe((res) => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc, 'Success');
        this.passEntry.emit(res);
      } else {
        this.toastService.error(res.errorDesc, 'Error');
      }
    });
  }

}
