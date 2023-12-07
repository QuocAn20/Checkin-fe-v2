import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AlfrescoService } from 'src/app/service/module/alfresco.service';
import { ServiceBankingService } from 'src/app/service/module/service-banking.service';

@Component({
  selector: 'app-service-banking-modal',
  templateUrl: './service-banking-modal.component.html',
  styleUrls: ['./service-banking-modal.component.scss'],
})
export class ServiceBankingModalComponent implements OnInit {
  @Input() type: any;
  @Input() item: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  form: any;
  isSubmit = false;
  url: any;
  listService: any;
  files: File[] = [];
  nameImage: any;
  // base64Image: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private serviceBankingService: ServiceBankingService,
    private toastService: ToastrService,
    private alfrescoService: AlfrescoService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  addFile(event: any): void {
    this.nameImage = event.target.files[0].name;
  }

  uploadFile(): void {
    if (this.nameImage) {
      const alfrescoFolderId = 'a2fb4914-b6e6-44fb-99df-afb31cca72e3';
      this.alfrescoService.uploadFile(this.nameImage, alfrescoFolderId)
        .subscribe(
          response => {
            console.log('File uploaded successfully to Alfresco!', response);
          },
          error => {
            console.error('Failed to upload file to Alfresco:', error);
          }
        );
    }
  }

  getFile():void{
    if (this.nameImage) {
      this.alfrescoService.getFile(this.nameImage)
        .subscribe(
          response => {
            console.log('File uploaded successfully to Alfresco!', response);
          },
          error => {
            console.error('Failed to upload file to Alfresco:', error);
          }
        );
    }
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      image: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });

    if (this.item) {
      this.form.patchValue(this.item);
    }
  }

  get f() {
    return this.form.controls;
  }

  cancel() {
    this.activeModal.close();
  }

  submit() {
    this.isSubmit = true;
    if (this.form.status === 'INVALID') {
      return;
    }

    if (this.item) {
      this.update();
    } else this.create();

    this.isSubmit = false;
  }

  create() {
    const json = {
      ...this.form.value,
      image: this.nameImage,
    };

    this.serviceBankingService.createService(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listService = res.data;
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
      image: this.nameImage,
    };

    this.serviceBankingService.updateService(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc, 'Success');
        this.passEntry.emit(res);
      } else {
        this.toastService.error(res.errorDesc, 'Error');
      }
    });
  }
}
