import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlfrescoService {
  private alfrescoApiUploadUrl =
    'https://0aw1v59h.trials.alfresco.com/alfresco/api/-default-/public/alfresco/versions/1/nodes/';

  private alfrescoApiGetUrl =
    'https://0aw1v59h.trials.alfresco.com/#/preview/s/';

  private basicAuthToken =
    'Basic ' + btoa('quocan17102000@gmail.com:2fosqFkQASHg');

  constructor(private http: HttpClient) {}

  uploadFile(file: File, alfrescoFolderId: string): Observable<any> {
    const uploadUrl = `${this.alfrescoApiUploadUrl}${alfrescoFolderId}`;

    const queryParams =
      'include=isFavorite,allowableOperations,path,definition';

    const formData: FormData = new FormData();
    formData.append('filedata', file, file.name);

    const headers = new HttpHeaders({
      // Add any additional headers if needed
      Authorization: this.basicAuthToken,
    });

    return this.http.post(`${uploadUrl}?${queryParams}`, formData, { headers });
  }

  getFile(fileId: string): Observable<any> {
    const fileUrl = `${this.alfrescoApiGetUrl}${fileId}`;

    const headers = new HttpHeaders({
      Authorization: this.basicAuthToken,
      responseType: 'text' 
    });

    return this.http.get(fileUrl, { headers });
  }
}
