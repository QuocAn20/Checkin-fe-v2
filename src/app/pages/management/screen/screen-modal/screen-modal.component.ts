import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ScreenService } from 'src/app/service/module/screen.service';

@Component({
  selector: 'app-screen-modal',
  templateUrl: './screen-modal.component.html',
  styleUrls: ['./screen-modal.component.scss'],
})
export class ScreenModalComponent implements OnInit {
  @Input() type: any;
  @Input() item: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  form: any;
  isSubmit = false;
  nameImage: any;
  base64Image: string = '';
  url: any;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private screenService: ScreenService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      image: [null, [Validators.required]],
      startDate: [null],
      endDate: [null],
      startTime: [null],
      endTime: [null],
    });

    if (this.item) {
      this.form.patchValue(this.item);
      console.log(this.form.value);
    }
  }

  get f() {
    return this.form.controls;
  }

  addFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const newFile = event.target.files[0];
      this.nameImage = newFile;
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.base64Image = event.target.result;
      };
      reader.readAsDataURL(newFile);
    }
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
    const json = {
      ...this.form.value,
      image: this.base64Image,
    };

    this.screenService.createScreen(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc, 'Success');
        this.passEntry.emit(res);
      } else {
        this.toastService.error(res.errorDesc, 'Error');
      }
    });
  }

  update() {
    const json = {
      ...this.form.value,
      image: this.base64Image || this.f.image.value,
    };
    this.screenService.updateScreen(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc, 'Success');
        this.passEntry.emit(res);
      } else {
        this.toastService.error(res.errorDesc, 'Error');
      }
    });
  }
}
