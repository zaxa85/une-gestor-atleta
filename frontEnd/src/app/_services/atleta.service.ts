import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Atleta } from '../_models/index';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class AtletaService {

    private API_URL = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Atleta[]>(this.API_URL + '/api/member');
    }

    getByStatus(status: number) {    
        return this.http.get<Atleta[]>(this.API_URL + '/api/member', {
            params: {"where": JSON.stringify({ status: status }) }
        })
    }

    getById(id: number) {
        return this.http.get<Atleta>(this.API_URL + '/api/member/' + id);
    }

    create(member: Atleta) {
        return this.http.post(this.API_URL + '/api/member/', member);
    }

    update(member: Atleta) {
        return this.http.patch(this.API_URL + '/api/member/' + member.id, member);
    }

    delete(id: number) {
        return this.http.delete(this.API_URL + '/api/member/' + id);
    }

}