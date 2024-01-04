import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/service/module/employee.service';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss']
})
export class EmployeeModalComponent implements OnInit{

  @Input() type: any;
  @Input() item: any;
  @Input() listRole: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  form: any;
  isSubmit = false;
  nationalIdImg: any;
  base64Image: string = '';

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

  listStatus = [
    {
      status: 'Active',
    },
    {
      status: 'inACtive',
    }
  ]

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.initForm();
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
      password: [null,Validators.minLength(6)],
      roleCode: [null],
    });

    if (this.item) {
      this.f.code.disable();
      this.form.patchValue(this.item);
    }
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
}