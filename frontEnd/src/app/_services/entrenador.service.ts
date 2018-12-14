import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Entrenador } from '../_models/entrenador';
import { environment } from '../../environments/environment';

@Injectable()
export class EntrenadorService {

    private API_URL = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Entrenador[]>(this.API_URL + '/api/sponsor');
    }

    getById(id: number) {
        return this.http.get<Entrenador>(this.API_URL + '/api/sponsor/' + id);
    }

    create(sponsor: Entrenador) {
        return this.http.post(this.API_URL + '/api/sponsor',sponsor);
    }

    update(sponsor: Entrenador) {
        return this.http.put(this.API_URL + '/api/sponsor/' + sponsor.id, sponsor);
    }

    delete(id: number) {
        return this.http.delete(this.API_URL + '/api/sponsor/' + id);
    }
}