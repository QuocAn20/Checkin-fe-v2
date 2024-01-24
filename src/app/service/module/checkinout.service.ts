import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListResponse } from 'src/app/models/base-list-response.model';
import { BaseResponse } from 'src/app/models/base-response.model';
import { CommandURL } from '../api-command';

@Injectable({
  providedIn: 'root',
})
export class CheckInOutService {
  constructor(private http: HttpClient) {}

  createInOut(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.INOUT + '/createInOut',
      json
    );
  }

  getInOut(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.INOUT + '/getInOut',
      json
    );
  }

  getCountLate(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.INOUT + '/getCountLate',
      json
    );
  }

  updateInOut(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.INOUT + '/updateInOut',
      json
    );
  }

  statisticMonthly(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.INOUT + '/statisticMonthly',
      json
    );
  }

  export(json: any) {
    return this.http.post(CommandURL.INOUT + '/export', json, {
      responseType: 'arraybuffer',
      headers: new HttpHeaders(),
    });
  }
}