import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListResponse } from 'src/app/models/base-list-response.model';
import { BaseResponse } from 'src/app/models/base-response.model';
import { CommandURL } from '../api-command';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  createNotification(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.NOTIFICATION + '/createNotification',
      json
    );
  }

  getNotification(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.NOTIFICATION + '/getNotification',
      json
    );
  }

  updateNotification(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.NOTIFICATION + '/updateNotification',
      json
    );
  }
}