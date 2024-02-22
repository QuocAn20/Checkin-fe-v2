import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListResponse } from 'src/app/models/base-list-response.model';
import { BaseResponse } from 'src/app/models/base-response.model';
import { CommandURL } from '../api-command';

@Injectable({
  providedIn: 'root',
})
export class DecentralizationService {
  constructor(private http: HttpClient) {}

  getDecentral(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.DECENTRAL + '/getDecentral',
      json
    );
  }

  updateDecentral(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.DECENTRAL + '/updateDecentral',
      json
    );
  }

  deleteDecentral(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.DECENTRAL + '/deleteDecentral',
      json
    );
  }
}