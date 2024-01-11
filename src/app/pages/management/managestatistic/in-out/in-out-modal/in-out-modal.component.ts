import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CheckInOutService } from 'src/app/service/module/checkinout.service';
import { createFileType, downLoadFile } from 'src/app/utils/export.util';

@Component({
  selector: 'app-in-out-modal',
  templateUrl: './in-out-modal.component.html',
  styleUrls: ['./in-out-modal.component.scss']
})
export class InOutModalComponent implements OnInit{
  @Input() type: any;
  @Input() item: any;
  @Input() listCheckIn: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  isSubmit = false;

  form: any;

  // listDay =[
  //   {
  //     day: '01'
  //   },
  //   {
  //     day: '02'
  //   },
  //   {
  //     day: '03'
  //   },
  //   {
  //     day: '04'
  //   },
  //   {
  //     day: '05'
  //   },
  //   {
  //     day: '06'
  //   },
  //   {
  //     day: '07'
  //   },
  //   {
  //     day: '08'
  //   },
  //   {
  //     day: '09'
  //   },
  //   {
  //     day: '10'
  //   },
  //   {
  //     day: '11'
  //   },
  //   {
  //     day: '12'
  //   },
  //   {
  //     day: '13'
  //   },
  //   {
  //     day: '14'
  //   },
  //   {
  //     day: '15'
  //   },
  //   {
  //     day: '16'
  //   },
  //   {
  //     day: '17'
  //   },
  //   {
  //     day: '18'
  //   },
  //   {
  //     day: '19'
  //   },
  //   {
  //     day: '20'
  //   },
  //   {
  //     day: '21'
  //   },
  //   {
  //     day: '22'
  //   },
  //   {
  //     day: '23'
  //   },
  //   {
  //     day: '24'
  //   },
  //   {
  //     day: '25'
  //   },
  //   {
  //     day: '26'
  //   },
  //   {
  //     day: '27'
  //   },
  //   {
  //     day: '28'
  //   },
  //   {
  //     day: '29'
  //   },
  //   {
  //     day: '30'
  //   },
  //   {
  //     day: '31'
  //   },
  // ]

  // listMonth =[
  //   {
  //     month: '01'
  //   },
  //   {
  //     month: '02'
  //   },
  //   {
  //     month: '03'
  //   },
  //   {
  //     month: '04'
  //   },
  //   {
  //     month: '05'
  //   },
  //   {
  //     month: '06'
  //   },
  //   {
  //     month: '07'
  //   },
  //   {
  //     month: '08'
  //   },
  //   {
  //     month: '09'
  //   },
  //   {
  //     month: '10'
  //   },
  //   {
  //     month: '11'
  //   },
  //   {
  //     month: '12'
  //   },
  // ]

  // listStatus =[
  //   {
  //     status: 'Valid',
  //   },
  //   {
  //     status: 'InValid',
  //   },
  // ]

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private checkInOutService: CheckInOutService
  ) {}

  ngOnInit(): void {
    this.initform();
    
    
    if(this.item){      
      this.form.patchValue(this.item);
      this.getInOut(this.item.employeeId);
    }
    
  }
  initform(){
    this.form = this.formBuilder.group({
      id: [null],
      code: [null],
      name: [null, [Validators.required]],
      room: [null, [Validators.required]],
      unit: [null, [Validators.required]],
      date: [null, [Validators.required]],
      checkIn: [null, [Validators.required]],
      checkOut: [null, [Validators.required]],
      workTime: [null, [Validators.required]],
      late: [null, [Validators.required]],
      soon: [null, [Validators.required]],
      status: [null, [Validators.required]]
    });
  }

  get f() {
    return this.form.controls;
  }

  getInOut(item: any){
    const json = {
      employeeId: item
    };
    this.checkInOutService.getInOut(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listCheckIn = res.data;
      }
    });
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

  create() {
    this.checkInOutService.createInOut(this.form.value).subscribe((res) => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc, 'Success');
        this.passEntry.emit(res);
      } else {
        this.toastService.error(res.errorDesc, 'Error');
      }
    });
  }

  update() {
    this.checkInOutService.updateInOut(this.form.value).subscribe((res) => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc, 'Success');
        this.passEntry.emit(res);
      } else {
        this.toastService.error(res.errorDesc, 'Error');
      }
    });
  }
}
