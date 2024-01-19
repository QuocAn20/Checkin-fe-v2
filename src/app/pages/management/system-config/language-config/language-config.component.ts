import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageConfigService } from 'src/app/service/module/language.service';

@Component({
  selector: 'app-language-config',
  templateUrl: './language-config.component.html',
  styleUrls: ['./language-config.component.scss'],
})
export class LanguageConfigComponent implements OnInit {
  form: any;
  isSubmit = false;
  language: Array<any> = [];

  listLanguage = [
    {
      languageName: 'Vietnamese',
      langValue: 'vi'
    },
    {
      languageName: 'English',
      langValue: 'en'
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private languageConfigService: LanguageConfigService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getLanguage();
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      supportLanguageId: [null],
      defaultLanguage: [null, [Validators.required]],
      supportLanguage: [null, [Validators.required]],
      uiLanguage: [null, [Validators.required]],
      multiLanguage: [null, [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

  refresh() {
    this.ngOnInit();
  }

  submit() {
    this.isSubmit = true;
    if (this.form.status === 'INVALID') {
      return;
    } else {
      if (this.language) {
        this.update();
      } else {
        this.refresh();
      }
    }
    this.isSubmit = false;
  }

  getLanguage() {
    this.languageConfigService.getLanguage({}).subscribe((res) => {
      this.language = res.data;
      this.form.patchValue(this.language[0]);
    });
  }

  update() {
    const json = {
      ...this.form.value,
    };
    this.languageConfigService.updateLanguage(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc, 'Success');
      } else {
        this.toastService.error(res.errorDesc, 'Error');
      }
    });
  }
}
