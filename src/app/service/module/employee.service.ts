import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListResponse } from 'src/app/models/base-list-response.model';
import { BaseResponse } from 'src/app/models/base-response.model';
import { CommandURL } from '../api-command';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  createEmployee(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.EMPLOYEE + '/createEmployee',
      json
    );
  }

  getEmployee(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.EMPLOYEE + '/getEmployee',
      json
    );
  }

  getAllEmployee(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.EMPLOYEE + '/getAllEmployee',
      json
    );
  }

  updateEmployee(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.EMPLOYEE + '/updateEmployee',
      json
    );
  }

  deleteEmployee(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.EMPLOYEE + '/deleteEmployee',
      json
    );
  }

  upload(json: any){
    return this.http.post<BaseResponse>(
      CommandURL.EMPLOYEE + '/upload',
      json
    );
  }
}