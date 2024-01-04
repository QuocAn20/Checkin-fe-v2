import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListResponse } from 'src/app/models/base-list-response.model';
import { BaseResponse } from 'src/app/models/base-response.model';
import { CommandURL } from '../api-command';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  constructor(private http: HttpClient) {}

  createSurvey(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.SURVEY + '/createSurvey',
      json
    );
  }

  getSurvey(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.SURVEY + '/getSurvey',
      json
    );
  }

  getAllSurvey(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.SURVEY + '/getAllSurvey',
      json
    );
  }

  updateSurvey(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.SURVEY + '/updateSurvey',
      json
    );
  }

  deleteSurvey(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.SURVEY + '/deleteSurvey',
      json
    );
  }
}