import { map } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SurveyService } from 'src/app/service/module/survey.service';

@Component({
  selector: 'app-survey-modal',
  templateUrl: './survey-modal.component.html',
  styleUrls: ['./survey-modal.component.scss']
})
export class SurveyModalComponent implements OnInit{

  @Input() type: any;
  @Input() item: any;
  @Input() listSurvey: any;
  @Input() questionType: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  isSubmit = false;

  form: any;

  listObject = [
    {
      object: 'None'
    },
    {
      object: 'All'
    },
    {
      object: 'Room'
    },
    {
      object: 'Unit'
    },
    {
      object: 'Individual'
    }
  ]

  listPercent =[
    {
      percent: '0%'
    },
    {
      percent: '25%'
    },
    {
      percent: '50%'
    },
    {
      percent: '75%'
    },
    {
      percent: '100%'
    }
  ]

  listStatus =[
    {
      status: 'Active'
    },
    {
      status: 'InActive'
    },
  ]

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private surveyService: SurveyService
  ) {}

  ngOnInit(): void {
    this.initForm();

    if(this.item){      
      this.form.patchValue(this.item);
      // change value of objectRequire[] to string
      if (this.item.objectRequire) {
        this.f.objectRequire.setValue(this.item.objectRequire.split(", "));
      }
      // change value of objectNonRequire[] to string
      if (this.item.objectNonRequire) {
        this.f.objectNonRequire.setValue(this.item.objectNonRequire.split(", "));
      }
    }
  }

  initForm(){
    this.form = this.formBuilder.group({
      id: [null],
      code: [null],
      createDate: [null],
      name: [null, [Validators.required]],
      question: [null, [Validators.required]],
      questionType: [null, [Validators.required]],
      objectRequire: [null],
      objectNonRequire: [null],
      startTime: [null, [Validators.required]],
      endTime: [null],
      percent: [null, [Validators.required]],
      status: [null, [Validators.required]],
      note: [null]
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
    const json ={
      ...this.form.value,
      objectRequire: this.f.objectRequire.value?.join(","),
      objectNonRequire: this.f.objectNonRequire.value?.join(","),
    }    
    this.surveyService.createSurvey(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc, 'Success');
        this.passEntry.emit(res);
      } else {
        this.toastService.error(res.errorDesc, 'Error');
      }
    });
  }

  update() {
    const json ={
      ...this.form.value,
      objectRequire: this.f.objectRequire.value?.join(","),
      objectNonRequire: this.f.objectNonRequire.value?.join(","),
    } 
    this.surveyService.updateSurvey(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc, 'Success');
        this.passEntry.emit(res);
      } else {
        this.toastService.error(res.errorDesc, 'Error');
      }
    });
  }

  detete() {
    this.surveyService.deleteSurvey(this.form.value).subscribe((res) => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc, 'Success');
        this.passEntry.emit(res);
      } else {
        this.toastService.error(res.errorDesc, 'Error');
      }
    });
  }
}
