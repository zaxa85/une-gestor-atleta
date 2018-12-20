import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Pago } from '../_models/index';
import { Periodo } from '../_models/index';

import { PagoService } from '../_services/index';
import { IngresoService  } from '../_services/index';
import { GastoService } from '../_services/index';

import { AlertService, AuthenticationService, PeriodoService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'control.payment.html'
})

export class ControlPaymentComponent implements OnInit {
    //currentUser: User;
    model: any;
    statusFilter = '0: 2016';
    periods: Periodo[] = [];

    constructor(
        private periodService: PeriodoService,
        private paymentService: PagoService,
        private incomeService: IngresoService,
        private expenditureService: GastoService,
        ) {
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    
    ngOnInit() {
        this.periodService.getByStatus(1).subscribe(periods => { this.periods = periods; });

        this.onChange(this.statusFilter);
    }
        
    onChange(year) {        
        this.paymentService.getPaymentControlByPeriod(year.split(":")[1].trim()).subscribe(model => { this.model = model; });
    }

    setFormat(paymentStatus) {
        if (paymentStatus == "1") {
            return "btn btn-warning";
        } else if (paymentStatus == "2") {
            return "btn btn-default";
        } else {
            return "";
        }
    }
}