import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gasto } from '../_models/index';
import { environment } from '../../environments/environment';

@Injectable()
export class GastoService {

    private API_URL = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(this.API_URL + '/api/gasto');
    }

    getByStatus(status: number) {
        return this.http.get<any>(this.API_URL + '/api/gasto', {
            params:
                { where: JSON.stringify({ status: status }) }
        })
    }

    getByPeriod(period: string) {
        return this.http.get<any>(this.API_URL + '/api/gasto', {
            params:
                { where: JSON.stringify({ id_fk_period_id: period }) }
        })
    }

    getExpendituresPerPeriod(period: string) {
        return this.http.get<any>(this.API_URL + '/api/gasto/getExpendituresPerPeriod?period=' + period + '&status=1');
    }

    getById(id: number) {
        return this.http.get<Gasto>(this.API_URL + '/api/gasto/' + id);
    }

    create(gasto: Gasto) {
        return this.http.post(this.API_URL + '/api/gasto/', gasto);
    }

    update(gasto: Gasto) {
        return this.http.patch(this.API_URL + '/api/gasto/' + gasto.id, gasto);
    }

    delete(id: number) {
        return this.http.delete(this.API_URL + '/api/gasto/' + id);
    }

    // private helper methods

}