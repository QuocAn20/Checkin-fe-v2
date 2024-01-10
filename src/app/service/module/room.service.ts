import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseListResponse } from 'src/app/models/base-list-response.model';
import { BaseResponse } from 'src/app/models/base-response.model';
import { CommandURL } from '../api-command';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private http: HttpClient) {}

  createRoom(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.ROOM + '/createRoom',
      json
    );
  }

  getRoom(json: any) {
    return this.http.post<BaseListResponse>(
      CommandURL.ROOM + '/getRoom',
      json
    );
  }

  updateRoom(json: any) {
    return this.http.post<BaseResponse>(
      CommandURL.ROOM + '/updateRoom',
      json
    );
  }
}