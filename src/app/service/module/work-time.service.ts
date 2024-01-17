import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListResponse } from 'src/app/models/base-list-response.model';
import { BaseResponse } from 'src/app/models/base-response.model';
import { CommandURL } from '../api-command';

@Injectable({
  providedIn: 'root',
})
export class WorkTimeService {
  constructor(private http: HttpClient) {}

  getWorkTime(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.WORKTIME + '/getWorkTime',
      json
    );
  }

  updateWorkTime(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.WORKTIME + '/updateWorkTime',
      json
    );
  }
}