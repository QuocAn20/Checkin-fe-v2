import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PasswordConfigService } from 'src/app/service/module/password-config.service';
import { UserService } from 'src/app/service/module/user.service';
import { base64DecodeUnicode } from 'src/app/utils/convert.util';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-changed-password',
  templateUrl: './changed-password.component.html',
  styleUrls: ['./changed-password.component.scss']
})
export class ChangedPasswordComponent implements OnInit{

  form: any;
  isSubmit = false;
  listAuthData: any;
  listPassConfig: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private passConfigService: PasswordConfigService,
    private userService: UserService
  ) {}
  
  ngOnInit(): void {
    this.initForm();
    this.getIdFromToken();
    this.getListPassConfig();
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      password: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmNewPass: [null, [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

  getIdFromToken(): any {
    if (sessionStorage.getItem('remember')) {
      this.listAuthData = JSON.parse(
        base64DecodeUnicode(sessionStorage.getItem('remember'))
      );
      console.log(this.listAuthData);
      
      return this.listAuthData;
    }
  }

  refresh() {
    this.ngOnInit();
  }

  submit() {
    this.isSubmit = true;
    if (this.form.status === 'INVALID') {
      
      return;
    } else {
      if (this.f.password.value) {        
        this.confirmNewPass();
      } else {
        this.refresh();
      }
    }
    this.isSubmit = false;
    this.refresh();
  }

  confirmNewPass(){
    if(this.f.newPassword.value.length > this.listPassConfig.minLength 
      && this.f.newPassword.value.length < this.listPassConfig.maxLength){
      if(this.f.newPassword.value != this.f.password.value){
        if(this.f.confirmNewPass.value == this.f.newPassword.value){
          this.update();
        }else{
          this.f.confirmNewPass.patchValue(null);
          this.toastService.warning('Confirm password does not match!', 'Warning');
        }      
      }else{
        this.f.newPassword.patchValue(null);
        this.f.confirmNewPass.patchValue(null);
        this.toastService.warning('New password can not be the same with old password!', 'Warning');
      }
    }else{
      this.f.newPassword.patchValue(null);
      this.f.confirmNewPass.patchValue(null);
      this.toastService.warning('This Password does not match the format!', 'Warning');
    }
  }

  update() {
    const json = {
      ...this.form.value,
      id: this.getIdFromToken().currentUser.userId,
    };        
    this.userService.changedPassword(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc, 'Success');
      } else {
        this.toastService.error(res.errorDesc, 'Error');
      }
    });
  }

  getListPassConfig() {
    this.passConfigService.getPassConfig({}).subscribe((res) => {
      this.listPassConfig = res.data;
    });
  }

  showNotiMin() {
    Swal.fire({
      title: 'Warning!',
      text: 'The Password is too short!',
      icon: 'warning',
      showConfirmButton: false,
      timer: 5000,
    })
  }

  showNotiMax() {
    Swal.fire({
      title: 'Warning!',
      text: 'The Password is too long!',
      icon: 'warning',
      showConfirmButton: false,
      timer: 5000,
    })
  }
}
