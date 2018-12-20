import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Periodo } from '../_models/index';
import { environment } from '../../environments/environment';

@Injectable()
export class PeriodoService {

        private API_URL = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(this.API_URL + '/api/periodo');
    }

    getByStatus(status: number) {       
        return this.http.get<Periodo[]>(this.API_URL + '/api/periodo', {
            params:
            { where: JSON.stringify({"where": { status: status} })}
        })
    }

    getById(id: number) {
        return this.http.get(this.API_URL + '/api/periodo/' + id);
    }

    create(periodo: Periodo) {
        return this.http.post(this.API_URL + '/api/periodo/', periodo);
    }

    update(periodo: Periodo) {
        return this.http.patch(this.API_URL + '/api/periodo/' + periodo.id, periodo);
    }

    delete(id: number) {
        return this.http.delete(this.API_URL + '/api/periodo/' + id);
    }
}