import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingreso } from '../_models/index';
import { environment } from '../../environments/environment';

@Injectable()
export class IngresoService {

    private API_URL = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(this.API_URL + '/api/ingreso');
    }

    getByStatus(status: number) {
        return this.http.get<any>(this.API_URL + '/api/ingreso', {
            params:
                { where: JSON.stringify({ status: status }) }
        })
    }

    getByPeriod(period: string) {
        return this.http.get(this.API_URL + '/api/ingreso', {
            params:
                { where: JSON.stringify({ id_fk_period_id: period }) }
        })
    }
    getIncomesPerPeriod(period: string) {  
        return this.http.get<any>(this.API_URL + '/api/ingreso/getIncomesPerPeriod?period=' + period + '&status=1');
    }

    getById(id: number) {
        return this.http.get<Ingreso>(this.API_URL + '/api/ingreso/' + id);
    }

    create(income: Ingreso) {
        return this.http.post(this.API_URL + '/api/ingreso/', income);
    }

    update(income: Ingreso) {
        return this.http.patch(this.API_URL + '/api/ingreso/' + income.id, income);
    }

    delete(id: number) {
        return this.http.delete(this.API_URL + '/api/ingreso/' + id);
    }
}