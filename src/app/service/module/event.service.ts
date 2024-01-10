import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListResponse } from 'src/app/models/base-list-response.model';
import { BaseResponse } from 'src/app/models/base-response.model';
import { CommandURL } from '../api-command';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  createEvent(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.EVENT + '/createEvent',
      json
    );
  }

  getEvent(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.EVENT + '/getEvent',
      json
    );
  }

  updateEvent(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.EVENT + '/updateEvent',
      json
    );
  }
}