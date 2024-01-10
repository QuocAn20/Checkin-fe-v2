import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListResponse } from 'src/app/models/base-list-response.model';
import { BaseResponse } from 'src/app/models/base-response.model';
import { CommandURL } from '../api-command';

@Injectable({
  providedIn: 'root',
})
export class HolidayService {
  constructor(private http: HttpClient) {}

  createHoliday(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.HOLIDAY + '/createHoliday',
      json
    );
  }

  getHoliday(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.HOLIDAY + '/getHoliday',
      json
    );
  }

  updateHoliday(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.HOLIDAY + '/updateHoliday',
      json
    );
  }
}