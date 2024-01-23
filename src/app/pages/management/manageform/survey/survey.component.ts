import { Component, OnInit } from '@angular/core';
import { SurveyModalComponent } from './survey-modal/survey-modal.component';
import Swal from 'sweetalert2';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SurveyService } from 'src/app/service/module/survey.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit{
  
  form: any;
  listSurvey: Array<any> = [];

  totalSize = 0;
  pageSize = 10;
  pageNumber = 1;

  questionType =[
    {
      qType: 'Yes/No'
    },
    {
      qType: 'Multiple-choice'
    },
    {
      qType: 'Multiple Answers'
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public toastService: ToastrService,
    private surveyService: SurveyService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getSurvey();
  }

  initForm() {
    this.form = this.formBuilder.group({
      code: [null],
      name: [null],
      startTime: [null],
      endTime: [null],
      questionType: [null]
    });
  }

  get f() {
    return this.form.controls;
  }

  getSurvey() {
    const json = {
      page: this.pageNumber,
      limit: this.pageSize,
      ...this.form.value,
    };

    this.surveyService.getSurvey(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listSurvey = res.data;
        this.totalSize = res.totalRecord;
      }
    });
  }

  refresh() {
    this.ngOnInit();
  }

  search() {
    this.getSurvey();
  }

  delete(item: any) {
    if (item) {
      Swal.fire({
        title: 'Warning!',
        text: 'Are you sure about deleting',
        icon: 'error',
        confirmButtonText: 'OK',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Cancel',
      }).then((res) => {
        if (res.value) {
          const json = {
            id: item.id,
            deleted: 1,
          };
          this.surveyService.deleteSurvey(json).subscribe(
            (res) => {
              if (res.errorCode === '0') {
                this.toastService.success(res.errorDesc, 'Success');
                this.getSurvey();
              } else {
                this.toastService.warning(res.errorDesc, 'Warning');
              }
            },
            (err) => {
              this.toastService.error(err, 'Notification');
            }
          );
        }
      });
      return;
    }
  }

  openSurveyModal(item: any, type: any) {
    const modalRef = this.modalService.open(SurveyModalComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
    });
    if (item) {
      modalRef.componentInstance.item = item;
    }
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.listSurvey = this.listSurvey;
    modalRef.componentInstance.questionType = this.questionType;
    modalRef.componentInstance.passEntry.subscribe((receive: any) => {
      this.modalService.dismissAll();
      this.getSurvey();
    });
  }

  changePageSize(item: any) {
    this.pageSize = item;
    this.getSurvey();
  }

  changePage(size: any) {
    this.pageNumber = size;
    this.getSurvey();
  }
}
