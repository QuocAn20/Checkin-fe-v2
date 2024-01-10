import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { WaitingScreenService } from 'src/app/service/module/waiting-screen.service';

@Component({
  selector: 'app-waiting-screen-modal',
  templateUrl: './waiting-screen-modal.component.html',
  styleUrls: ['./waiting-screen-modal.component.scss']
})
export class WaitingScreenModalComponent implements OnInit{
  
  @Input() type: any;
  @Input() item: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  isSubmit = false;

  nameImage: any;
  base64Image: string = '';

  form: any;

  listTypes = [
    {
      showType: 'Image'
    },
    {
      showType: 'Video'
    }
  ]

  listStatus =[
    {
      status: 'Default',
    },
    {
      status: 'Random',
    },
  ]

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private wScreenService: WaitingScreenService
  ) {}

  ngOnInit(): void {
    this.initForm();
    if(this.item){
      this.form.patchValue(this.item);
    }
  }

  initForm(){
    this.form = this.formBuilder.group({
      id: [null],
      code: [null],
      showType: [null, [Validators.required]],
      status: [null, [Validators.required]],
      contentFile: [null, [Validators.required]],
      notification: [null, [Validators.required]],
      note: [null],
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
    this.wScreenService.createWScreen(this.form.value).subscribe((res) => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc, 'Success');
        this.passEntry.emit(res);
      } else {
        this.toastService.error(res.errorDesc, 'Error');
      }
    });
  }

  update() {
    this.wScreenService.updateWScreen(this.form.value).subscribe((res) => {
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
      this.nameImage = newFile;
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.f.contentFile.patchValue(event.target.result);
      };
      reader.readAsDataURL(newFile);
    }
  }
}
