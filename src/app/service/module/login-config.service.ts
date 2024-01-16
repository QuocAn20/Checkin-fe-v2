import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListResponse } from 'src/app/models/base-list-response.model';
import { BaseResponse } from 'src/app/models/base-response.model';
import { CommandURL } from '../api-command';

@Injectable({
  providedIn: 'root',
})
export class LoginConfigService {
  constructor(private http: HttpClient) {}

  getLConfig(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.LCONFIG + '/getLConfig',
      json
    );
  }

  updateLConfig(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.LCONFIG + '/updateLConfig',
      json
    );
  }
}