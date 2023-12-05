import { Injectable } from '@angular/core';
import { BaseResponse } from 'src/app/models/base-response.model';
import { HttpClient } from '@angular/common/http';
import { CommandURL } from '../api-command';
import { BaseListResponse } from 'src/app/models/base-list-response.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceBankingService {
  constructor(private http: HttpClient) {}

  createService(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.SERVICE + '/createService',
      json
    );
  }

  getService(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.SERVICE + '/getService',
      json
    );
  }

  updateService(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.SERVICE + '/updateService',
      json
    );
  }

  deleteService(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.SERVICE + '/deleteService',
      json
    );
  }

  restoreService(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.SERVICE + '/restoreService',
      json
    );
  }

  removeService(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.SERVICE + '/removeService',
      json
    );
  }
}
