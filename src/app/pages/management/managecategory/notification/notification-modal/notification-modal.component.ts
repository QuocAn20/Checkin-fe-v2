import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EventService } from 'src/app/service/module/event.service';
import { HolidayService } from 'src/app/service/module/holiday.service';
import { NotificationService } from 'src/app/service/module/notification.service';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss']
})
export class NotificationModalComponent implements OnInit{

  @Input() type: any;
  @Input() item: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  isSubmit = false;

  form: any;

  @Input() listNotiType: Array<any> = [];
  @Input() listObject: Array<any> = [];


  listStatus =[
    {
      status: 'Active',
    },
    {
      status: 'InActive',
    },
  ]

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private notifiService: NotificationService
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
      notiType: [{value: null, disabled: this.type === "view" ? true : false}],
      object: [{value: null, disabled: this.type === "view" ? true : false}, [Validators.required]],
      content: [{value: null, disabled: this.type === "view" ? true : false}],
      notiPlace: [{value: null, disabled: this.type === "view" ? true : false}, [Validators.required]],
      note: [{value: null, disabled: this.type === "view" ? true : false}],
      status: [{value: null, disabled: this.type === "view" ? true : false}, [Validators.required]]
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

  create() {
    this.notifiService.createNotification(this.form.value).subscribe((res) => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc, 'Success');
        this.passEntry.emit(res);
      } else {
        this.toastService.error(res.errorDesc, 'Error');
      }
    });
  }

  update() {
    this.notifiService.updateNotification(this.form.value).subscribe((res) => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc, 'Success');
        this.passEntry.emit(res);
      } else {
        this.toastService.error(res.errorDesc, 'Error');
      }
    });
  }
}
