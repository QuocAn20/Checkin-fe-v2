import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListResponse } from 'src/app/models/base-list-response.model';
import { BaseResponse } from 'src/app/models/base-response.model';
import { CommandURL } from '../api-command';

@Injectable({
  providedIn: 'root',
})
export class PasswordConfigService {
  constructor(private http: HttpClient) {}

  getPassConfig(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.PASSCONFIG + '/getPassConfig',
      json
    );
  }

  updatePassConfig(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.PASSCONFIG + '/updatePassConfig',
      json
    );
  }
}