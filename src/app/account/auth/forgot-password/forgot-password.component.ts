import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/module/auth.service';
import { CheckInOutService } from 'src/app/service/module/checkinout.service';
import { LoginConfigService } from 'src/app/service/module/login-config.service';
import { UserService } from 'src/app/service/module/user.service';
import { base64DecodeUnicode } from 'src/app/utils/convert.util';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  form: any;
  isSubmit: Boolean = false;
  loginAttempts: number = 0;
  loginSlots: number = 0;
  listLimitLogin: any;
  listAuthData: Array<any> = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    document.body.style.backgroundImage =
      "url('assets/img/lunar-new-year.jpg')";
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      userName: [null, [Validators.required]],
      email: [
        null,
        [Validators.required, Validators.pattern('(^[^s@]+@[^s@]+.[^s@]+$)')],
      ],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.form.status === 'VALID') {
      this.changePassword();
    }
  }

  showNoti() {
    Swal.fire({
      title: 'Warning!',
      text: 'Confirm Password does not match',
      icon: 'error',
      showConfirmButton: false,
      timer: 5000,
    }).then((res) => {
      this.loginSlots = 0;
    });
  }

  changePassword() {
    const json = {
      ...this.form.value,
    };
    this.userService.forgotPassword(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc, 'Success');
      } else {
        this.toastService.error(res.errorDesc, 'Error');
      }
    });
    this.router.navigate(['']);
  }
}
