import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListResponse } from 'src/app/models/base-list-response.model';
import { BaseResponse } from 'src/app/models/base-response.model';
import { CommandURL } from '../api-command';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  constructor(private http: HttpClient) {}

  createUnit(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.UNIT + '/createUnit',
      json
    );
  }

  getUnit(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.UNIT + '/getUnit',
      json
    );
  }

  updateUnit(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.UNIT + '/updateUnit',
      json
    );
  }
}