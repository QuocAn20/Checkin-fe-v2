import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListResponse } from 'src/app/models/base-list-response.model';
import { BaseResponse } from 'src/app/models/base-response.model';
import { CommandURL } from '../api-command';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private http: HttpClient) {}

  createMenu(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.MENU + '/createMenu', 
      json
    );
  }

  getMenu(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.MENU + '/getMenu',
      json
    );
  }

  getMenuByRole(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.MENU + '/getMenuByRole',
      json
    );
  }

  updateMenu(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.MENU + '/updateMenu', 
      json
    );
  }

  deleteMenu(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.MENU + '/deleteMenu', 
      json
    );
  }
}
