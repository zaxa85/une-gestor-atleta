import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Periodo } from '../_models/index';

import { AlertService, AuthenticationService, PeriodoService, PagoService, IngresoService, GastoService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'control.balance.html'
})

export class ControlBalanceComponent implements OnInit {
    //currentUser: User;
    statusFilter = '0: 2016';
    periods: Periodo[] = [];
    viewIncomesByMembers = 0;
    viewExpendituresPerPeriod = 0;
    viewIncomessPerPeriod = 0;
    //result: any;
    paymentControl: any;
    incomesByType: any;
    expendituresByType: any;

    constructor(
        private periodService: PeriodoService,
        private incomeService: IngresoService,
        private expenditureService: GastoService,
        private paymentService: PagoService,

    ) {
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        //Load periods dropdown
        this.periodService.getByStatus(1).subscribe(periods => { this.periods = periods; });
        this.onChange(this.statusFilter);
    }

    onChange(year) {

        this.paymentService.getPaymentBalanceByPeriod(year.split(":")[1].trim()).subscribe(paymentControl => { this.paymentControl = paymentControl; });
        this.paymentService.geIncomeByType(year.split(":")[1].trim()).subscribe(incomesByType => { this.incomesByType = incomesByType; });
        this.paymentService.geExpenditureByType(year.split(":")[1].trim()).subscribe(expendituresByType => { this.expendituresByType = expendituresByType; });



        this.expenditureService.getExpendituresPerPeriod(year.split(":")[1].trim()).subscribe(data => {
            this.viewExpendituresPerPeriod = parseFloat(data);
        });

        this.incomeService.getIncomesPerPeriod(year.split(":")[1].trim()).subscribe(data => {
            this.viewIncomessPerPeriod = parseFloat(data);
        });

    }

    getPaymentBalanceByPeriodTotals(data) {
        let total = 0;

        if (data != undefined || data != null) {
            data.forEach((d) => {
                total += parseFloat(d.total);
              });

        }    
        return total;
    }

    definirTipoIngresos(param) {
        if (param == 1) {
            return "Auspicio"
        }
        else if (param == 2) {
            return "Donación"
        }
        else if (param == 3) {
            return "Ganancia"
        } 
        else {
            return "Otro"    
        }
    }

    definirTipoGastos(param) {
        if (param == 1) {
            return "Gastos por tramites"
        }
        else if (param == 2) {
            return "Gastos por transporte"
        }
        else if (param == 3) {
            return "Gastos por inscripciones"
        } 
        else if (param == 4) {
            return "Gastos por reuniones"
        } 
        else if (param == 5) {
            return "Gastos de competencia"
        } 
        else {
            return "Otros gastos"    
        }
    }
}
