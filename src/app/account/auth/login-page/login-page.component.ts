import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { AuthService } from 'src/app/service/module/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  form: any;
  isSubmit: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    document.body.style.backgroundImage =
      "url('assets/img/tet-holiday-1.jpg')";
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
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

  login() {
    const json = this.form.value;
    this.authService
      .login(json)
      .pipe(first())
      .subscribe(
        (res) => {
          if (res) {
            if (res.role === 'ADMIN') {
              this.router.navigate(['/pages/management/dashboard']).then(() => {
                window.location.reload();
                console.log(res.user.role);                
              });
            } else if (res.role === 'EMPLOYEE') {
              this.router.navigate(['/pages/management/employee']).then(() => {
                window.location.reload();
              });
            }
          }
        },
        (error) => {
          this.toastService.error('Login failed!');
        }
      );
  }
}
