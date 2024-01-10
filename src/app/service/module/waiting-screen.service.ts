import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListResponse } from 'src/app/models/base-list-response.model';
import { BaseResponse } from 'src/app/models/base-response.model';
import { CommandURL } from '../api-command';

@Injectable({
  providedIn: 'root',
})
export class WaitingScreenService {
  constructor(private http: HttpClient) {}

  createWScreen(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.WAITINGSCREEN + '/createWScreen',
      json
    );
  }

  getWScreen(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.WAITINGSCREEN + '/getWScreen',
      json
    );
  }

  updateWScreen(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.WAITINGSCREEN + '/updateWScreen',
      json
    );
  }
}