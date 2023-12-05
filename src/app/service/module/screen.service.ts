import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListResponse } from 'src/app/models/base-list-response.model';
import { BaseResponse } from 'src/app/models/base-response.model';
import { CommandURL } from '../api-command';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  constructor(private http: HttpClient) {}

  createScreen(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.SCREEN + '/createScreen',
      json
    );
  }

  getScreen(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.SCREEN + '/getScreen',
      json
    );
  }

  updateScreen(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.SCREEN + '/updateScreen',
      json
    );
  }

  deleteScreen(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.SCREEN + '/deleteScreen',
      json
    );
  }
}
