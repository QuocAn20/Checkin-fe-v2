import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListResponse } from 'src/app/models/base-list-response.model';
import { BaseResponse } from 'src/app/models/base-response.model';
import { CommandURL } from '../api-command';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  createRegister(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.REGISTER + '/createRegister',
      json
    );
  }

  getRegister(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.REGISTER + '/getRegister',
      json
    );
  }

  updateRegister(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.REGISTER + '/updateRegister',
      json
    );
  }

  deleteRegister(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.REGISTER + '/deleteRegister',
      json
    );
  }
}