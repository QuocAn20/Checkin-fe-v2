import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/service/module/register.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent {

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
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {
    this.initForm();

    if(this.item){      
      this.form.patchValue(this.item);
      // change value of objectRequire[] to string
      if (this.item.objectRequire) {
        this.f.objectRequire.setValue(this.item.objectRequire.split(","));
      }
      // change value of objectNonRequire[] to string
      if (this.item.objectNonRequire) {
        this.f.objectNonRequire.setValue(this.item.objectNonRequire.split(","));
      }
    }
  }

  initForm(){
    this.form = this.formBuilder.group({
      id: [null],
      code: [null],
      createDate: [{value: null, disabled: this.type === "view" ? true : false}],
      name: [{value: null, disabled: this.type === "view" ? true : false}, [Validators.required]],
      question: [{value: null, disabled: this.type === "view" ? true : false}, [Validators.required]],
      questionType: [{value: null, disabled: this.type === "view" ? true : false}, [Validators.required]],
      objectRequire: [{value: null, disabled: this.type === "view" ? true : false}],
      objectNonRequire: [{value: null, disabled: this.type === "view" ? true : false}],
      startTime: [{value: null, disabled: this.type === "view" ? true : false}, [Validators.required]],
      endTime: [{value: null, disabled: this.type === "view" ? true : false}],
      status: [{value: null, disabled: this.type === "view" ? true : false}, [Validators.required]],
      note: [{value: null, disabled: this.type === "view" ? true : false}]
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
    this.registerService.createRegister(json).subscribe((res) => {
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
    this.registerService.updateRegister(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc, 'Success');
        this.passEntry.emit(res);
      } else {
        this.toastService.error(res.errorDesc, 'Error');
      }
    });
  }

  detete() {
    this.registerService.deleteRegister(this.form.value).subscribe((res) => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc, 'Success');
        this.passEntry.emit(res);
      } else {
        this.toastService.error(res.errorDesc, 'Error');
      }
    });
  }

}
