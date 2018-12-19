import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Atleta } from '../_models/index';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class AtletaService {

    private API_URL = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Atleta[]>(this.API_URL + '/api/atletas');
    }

    getByStatus(status: number) {    
        return this.http.get<Atleta[]>(this.API_URL + '/api/atletas', {
            params: {where: JSON.stringify({ status: status }) }
        })
    }

    getById(id: number) {
        return this.http.get<Atleta>(this.API_URL + '/api/atletas/' + id);
    }

    create(atleta: Atleta) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        let options = {
            headers: headers
        };

        //this.http.post()

        return this.http.post(this.API_URL + '/api/atletas/', atleta, options);
    }

    update(atleta: Atleta) {
        return this.http.patch(this.API_URL + '/api/atletas/' + atleta.id, atleta);
    }

    delete(id: number) {
        return this.http.delete(this.API_URL + '/api/atletas/' + id);
    }

}