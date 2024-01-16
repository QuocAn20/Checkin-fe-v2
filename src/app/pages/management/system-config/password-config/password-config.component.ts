import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PasswordConfigService } from 'src/app/service/module/password-config.service';

@Component({
  selector: 'app-password-config',
  templateUrl: './password-config.component.html',
  styleUrls: ['./password-config.component.scss']
})
export class PasswordConfigComponent implements OnInit{
  form: any;
  isSubmit = false;
  passConfig: Array<any> = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private passConfigService: PasswordConfigService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getPassConfig();
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      minLength: [null, [Validators.required]],
      maxLength: [null, [Validators.required]],
      minChar: [null, [Validators.required]],
      minNum: [null, [Validators.required]],
      minSPChar: [null, [Validators.required]],
      timeOverPass: [null, [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

  refresh() {
    this.ngOnInit();
  }

  submit() {
    this.isSubmit = true;
    if (this.form.status === 'INVALID') {
      
      return;
    } else {
      if (this.passConfig) {        
        this.update();
      } else {
        this.refresh();
      }
    }
    this.isSubmit = false;
  }

  getPassConfig(){
    const json = {
      ...this.form.value,
    };
    this.passConfigService.getPassConfig(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.form.patchValue(res.data);
        this.f.timeOverPass.patchValue(res.data.timeOverPass/2628000);
      }
    });
  }

  update() {
    const json = {
      ...this.form.value,
      timeOverPass: this.f.timeOverPass.value * 2628000
    };
    this.passConfigService.updatePassConfig(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc, 'Success');
      } else {
        this.toastService.error(res.errorDesc, 'Error');
      }
    });
  }

}
