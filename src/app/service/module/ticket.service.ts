import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListResponse } from 'src/app/models/base-list-response.model';
import { BaseResponse } from 'src/app/models/base-response.model';
import { CommandURL } from '../api-command';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private http: HttpClient) {}

  createTicket(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.TICKET + '/createTicket',
      json
    );
  }

  fakeCreateTicket(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.TICKET + '/fakeCreateTicket',
      json
    );
  }

  fakeNotification(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.TICKET + '/fakeNotification',
      json
    );
  }

  searchTicketForNotification(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.TICKET + '/searchTicketForNotification',
      json
    );
  }

  getTicket(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.TICKET + '/getTicket',
      json
    );
  }

  getTicketForTV(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.TICKET + '/getTicketForTV',
      json
    );
  }

  getAllTicket(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.TICKET + '/getAllTicket',
      json
    );
  }

  updateTicket(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.TICKET + '/updateTicket',
      json
    );
  }

  evaluateTicket(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.TICKET + '/evaluateTicket',
      json
    );
  }

  deleteTicket(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.TICKET + '/deleteTicket',
      json
    );
  }

  statisticMonthly(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.TICKET + '/statisticMonthly',
      json
    );
  }

  getCountTicket(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.TICKET + '/getCountTicket',
      json
    );
  }

  getTicketDataForEmployee(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.TICKET + '/getTicketDataForEmployee',
      json
    );
  }

  export(json: any) {
    return this.http.post(CommandURL.TICKET + '/export', json, {
      responseType: 'arraybuffer',
      headers: new HttpHeaders(),
    });
  }
}
