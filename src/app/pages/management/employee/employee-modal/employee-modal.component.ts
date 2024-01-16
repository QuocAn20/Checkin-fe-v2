import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/service/module/employee.service';
import { PasswordConfigService } from 'src/app/service/module/password-config.service';
import { UnitService } from 'src/app/service/module/unit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss']
})
export class EmployeeModalComponent implements OnInit{

  @Input() type: any;
  @Input() item: any;
  @Input() listRole: any;
  @Input() listEmployee: any;
  @Input() listRoom: any;
  @Input() listGender: any;
  @Input() listPosition: any;
  @Input() listStatus: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  form: any;
  isSubmit = false;
  nationalIdImg: any;
  base64Image: string = '';
  listUnit: any;
  listPassConfig: any;

  listQuantity = [
    {
      code: 5,
    },
    {
      code: 10,
    },
    {
      code: 15,
    },
  ];

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private unitService: UnitService,
    private passConfigService: PasswordConfigService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.initForm();
    this.getUnit();
    this.getListPassConfig();
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      code: [null],
      name: [null, [Validators.required]],
      dob: [null],
      gender: [null],
      phone: [null, [Validators.pattern("(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})")]],
      nationalId: [null],
      imgNationalId: [null],
      unit: [null, [Validators.required]],
      room: [null, [Validators.required]],
      position: [null, [Validators.required]],
      job: [null, [Validators.required]],
      email: [null, [Validators.pattern("(^[^\s@]+@[^\s@]+\.[^\s@]+$)")]],
      imgProfile: [null],
      role: [null],
      status: [null, [Validators.required]],
      
      userName: [null],
      password: [null],
      roleCode: [null],
    });

    if (this.item) {
      this.form.patchValue(this.item);
    }
  }

  getUnit() {
    const json = {
      status: 'Active'
    };
    this.unitService.getUnit(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listUnit = res.data.map((e: any) => e.name);
      }
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
    if(this.f.password.value.length < this.listPassConfig.minLength){
      this.showNotiMin();
      this.f.password.patchValue(null);
    }else if (this.f.password.value.length > this.listPassConfig.maxLength){
      this.showNotiMax();
      this.f.password.patchValue(null);
    }else{
      this.f.roleCode.patchValue('EMPLOYEE');
  
      this.employeeService.createEmployee(this.form.value).subscribe((res) => {
        if (res.errorCode === '0') {
          this.toastService.success(res.errorDesc, 'Success');
          this.passEntry.emit(res);
        } else {
          this.toastService.error(res.errorDesc, 'Error');
        }
      });
    }
  }

  update() {
    this.employeeService.updateEmployee(this.form.value).subscribe((res) => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc, 'Success');
        this.passEntry.emit(res);
      } else {
        this.toastService.error(res.errorDesc, 'Error');
      }
    });
  }

  addFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const newFile = event.target.files[0];
      this.nationalIdImg = newFile;
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.base64Image = event.target.result;
      };
      reader.readAsDataURL(newFile);
    }
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