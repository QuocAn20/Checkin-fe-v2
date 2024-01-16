import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginConfigService } from 'src/app/service/module/login-config.service';

@Component({
  selector: 'app-login-config',
  templateUrl: './login-config.component.html',
  styleUrls: ['./login-config.component.scss'],
})
export class LoginConfigComponent implements OnInit {
  form: any;
  isSubmit = false;
  lConfig: Array<any> = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private loginConfigService: LoginConfigService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getLConfig();
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      timeInLogin: [null, [Validators.required]],
      limitLoginWrong: [null, [Validators.required]],
      limitLogin: [null, [Validators.required]],
      timeLoginAgain: [null, [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

  getLConfig() {
    const json = {
      ...this.form.value,
    };
    this.loginConfigService.getLConfig(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.lConfig = res.data;
        if (this.lConfig) {
          this.form.patchValue(this.lConfig);
        }
      }
    });
  }

  // create() {
  //   const json = {
  //     ...this.form.value,
  //   };

  //   this.loginConfigService.createLConfig(json).subscribe((res) => {
  //     if (res.errorCode === '0') {
  //       this.toastService.success(res.errorDesc, 'Success');
  //     } else {
  //       this.toastService.error(res.errorDesc, 'Error');
  //     }
  //   });
  // }

  update() {
    const json = {
      ...this.form.value,
    };
    this.loginConfigService.updateLConfig(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc, 'Success');
      } else {
        this.toastService.error(res.errorDesc, 'Error');
      }
    });
  }
}
