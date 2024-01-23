import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListResponse } from 'src/app/models/base-list-response.model';
import { BaseResponse } from 'src/app/models/base-response.model';
import { CommandURL } from '../api-command';

@Injectable({
  providedIn: 'root',
})
export class SuggestionService {
  constructor(private http: HttpClient) {}

  createSuggest(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.SUGGEST + '/createSuggest',
      json
    );
  }

  getSuggest(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.SUGGEST + '/getSuggest',
      json
    );
  }

  updateSuggest(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.SUGGEST + '/updateSuggest',
      json
    );
  }
}