import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WorkTimeService } from 'src/app/service/module/work-time.service';

@Component({
  selector: 'app-working-time',
  templateUrl: './working-time.component.html',
  styleUrls: ['./working-time.component.scss']
})
export class WorkingTimeComponent implements OnInit{

  form: any;
  isSubmit = false;
  listWorkTime: any;

  listDay= [
    {
      day: 'Mon'
    },
    {
      day: 'Tue'
    },
    {
      day: 'Wed'
    },
    {
      day: 'Thu'
    },
    {
      day: 'Fri'
    },
    {
      day: 'Sat'
    },
    {
      day: 'Sun'
    },
  ]

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private workTimeService: WorkTimeService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getWorkingTime();
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      workDayId: [null],
      freeDayId: [null],
      startTime: [null, [Validators.required]],
      endTime: [null, [Validators.required]],
      workDay: [null, [Validators.required]],
      freeDay: [null, [Validators.required]]
    });
  }

  get f() {
    return this.form.controls;
  }

  refresh(){
    this.ngOnInit();
  }

  submit() {
    this.isSubmit = true;
    if (this.form.status === 'INVALID') {
      
      return;
    } else {
      if (this.f.workDay.value) {        
        this.update();
      } else {
        this.refresh();
      }
    }
    this.isSubmit = false;
  }

  getWorkingTime(){
    this.workTimeService.getWorkTime({}).subscribe((res) => {
      this.listWorkTime = res.data;
      this.form.patchValue(this.listWorkTime[0]);
    });
  }

  update() {
    const json = {
      ...this.form.value
    };        
    this.workTimeService.updateWorkTime(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc, 'Success');
      } else {
        this.toastService.error(res.errorDesc, 'Error');
      }
    });
  }

}
