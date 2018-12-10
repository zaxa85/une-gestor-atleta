import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';  


import { environment } from '../../environments/environment';

@Injectable()
export class StorageService {

    private API_URL = environment.apiUrl;

    constructor(private http: HttpClient) { }

    postFile(fileToUpload: File, location: string): Observable<boolean> {
        const endpoint = this.API_URL + '/api/containers/' + location + '/upload';
        const formData: FormData = new FormData();
        formData.append('fileKey', fileToUpload, fileToUpload.name);
        return<any>this.http.post(endpoint, formData); 
    }
 
}