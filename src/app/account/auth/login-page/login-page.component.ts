import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first, takeWhile } from 'rxjs';
import { AuthService } from 'src/app/service/module/auth.service';
import { CheckInOutService } from 'src/app/service/module/checkinout.service';
import { LoginConfigService } from 'src/app/service/module/login-config.service';
import { base64DecodeUnicode } from 'src/app/utils/convert.util';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  form: any;
  isSubmit: Boolean = false;
  loginAttempts: number = 0;
  loginSlots: number = 0;
  listLimitLogin: any;
  listAuthData: Array<any> = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastrService,
    private loginConfigService: LoginConfigService,
    private checkInOutService: CheckInOutService
  ) {}

  ngOnInit() {
    document.body.style.backgroundImage = "url('assets/img/lunar-new-year.jpg')";
    this.initForm();
    this.getListLimitLogin();
  }

  initForm() {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      employeeId: [null],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.form.status === 'VALID') {
      this.login();
    }
  }

  getIdFromToken(): any {
    if (sessionStorage.getItem('remember')) {
      this.listAuthData = JSON.parse(
        base64DecodeUnicode(sessionStorage.getItem('remember'))
      );
      return this.listAuthData;
    }
  }

  getListLimitLogin() {
    this.loginConfigService.getLConfig({}).subscribe((res) => {
      this.listLimitLogin = res.data;
    });
  }

  showNotiLoginWrong() {
    Swal.fire({
      title: 'Warning!',
      text: 'Out of Slots to Login, Please waiting to continue Login!',
      icon: 'error',
      showConfirmButton: false,
      timer: this.listLimitLogin.timeLoginAgain * 1000,
    }).then((res) => {
      this.loginAttempts = 0;
    });
  }

  showNotiLoginFull() {
    Swal.fire({
      title: 'Warning!',
      text: 'Full Of slots login in this day',
      icon: 'error',
      showConfirmButton: false,
      timer: this.listLimitLogin.timeLoginAgain * 1000,
    }).then((res) => {
      this.loginSlots = 0;
    });
  }

  login() {
    const json = this.form.value;
    if (this.loginAttempts >= this.listLimitLogin?.limitLoginWrong) {
      this.showNotiLoginWrong();
      return;
    }

    this.authService
      .login(json)
      .pipe(first())
      .subscribe(
        (res) => {
          if (res) {
            this.loginSlots++;
            if (this.loginSlots >= this.listLimitLogin.limitLogin) {
              this.showNotiLoginFull();
              return;
            }
            if (res.role === 'ADMIN') {
              this.router.navigate(['/pages/management/home-page']).then(() => {
                window.location.reload();
              });
            } else if (res.role === 'EMPLOYEE') {
              this.checkInOutService
                .createInOut({
                  id: this.getIdFromToken().currentUser.userId,
                  status: 'InValid',
                })
                .subscribe((res) => {
                  if (res.errorCode === '0') {
                    this.toastService.success(res.errorDesc, 'Success');
                  } else {
                    this.toastService.error(res.errorDesc, 'Error');
                  }
                });
              this.router.navigate(['/pages/management/home-page']).then(() => {
                window.location.reload();
              });
            }
          }
        },
        (error) => {
          this.loginAttempts++;
          if (this.loginAttempts < this.listLimitLogin?.limitLoginWrong) {
            this.toastService.error('Login failed!');
          }
          console.log(this.loginAttempts);
        }
      );
  }
}
