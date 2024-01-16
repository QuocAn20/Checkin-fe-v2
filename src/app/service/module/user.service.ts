import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListResponse } from 'src/app/models/base-list-response.model';
import { BaseResponse } from 'src/app/models/base-response.model';
import { CommandURL } from '../api-command';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.USER + '/createUser',
      json
    );
  }

  getUser(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.USER + '/getUser',
      json
    );
  }

  changedPassword(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.USER + '/changedPassword',
      json
    );
  }
}