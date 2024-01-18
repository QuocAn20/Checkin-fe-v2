import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListResponse } from 'src/app/models/base-list-response.model';
import { BaseResponse } from 'src/app/models/base-response.model';
import { CommandURL } from '../api-command';

@Injectable({
  providedIn: 'root',
})
export class LanguageConfigService {
  constructor(private http: HttpClient) {}

  getLanguage(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.LANGUAGE + '/getLanguage',
      json
    );
  }

  updateLanguage(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.LANGUAGE + '/updateLanguage',
      json
    );
  }
}