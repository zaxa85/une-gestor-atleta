import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pago } from '../_models/index';
import { environment } from '../../environments/environment';

@Injectable()
export class PagoService {

    private API_URL = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getPaymentControlByPeriod(year: string) {
        return this.http.get(this.API_URL + '/api/v_payment_control', {
            params:
                { filter: JSON.stringify({ "where": { period: year } }) }
        })
    }

    getPaymentBalanceByPeriod(year: string) {
        return this.http.get(this.API_URL + '/api/v_payment_balance', {
            params:
                { where: JSON.stringify({ "where": { id: year } }) }
        })
    }

    geIncomeByType(year: string) {
        return this.http.get(this.API_URL + '/api/v_income_by_type', {
            params:
                { where: JSON.stringify({ "where": { id_fk_period_id: year } }) }
        })
    }

    geExpenditureByType(year: string) {
        return this.http.get(this.API_URL + '/api/v_expenditure_by_type', {
            params:
                { where: JSON.stringify({ "where": { id_fk_period_id: year } }) }
        })
    }

    getByMember(member: number, year: string) {
        return this.http.get(this.API_URL + '/api/payment', {
            params:
                { where: JSON.stringify({ "where": { id_fk_member_id: member, id_fk_period_id: year } }) }
        })
    }

    getById(id: number) {
        return this.http.get<Pago>(this.API_URL + '/api/payment/' + id);
    }

    create(payment: Pago) {
        return this.http.post(this.API_URL + '/api/payment/', payment);
    }

    update(payment: Pago) {
        return this.http.patch(this.API_URL + '/api/payment/' + payment.id, payment);
    }

    delete(id: number) {
        return this.http.delete(this.API_URL + '/api/payment/' + id);
    }
}