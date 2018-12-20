import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Periodo } from '../_models/index';

import { AlertService, AuthenticationService, GastoService, PeriodoService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'expenditure.list.component.html'
})

export class ExpenditureListComponent {
    //currentUser: User;
    model: any;
    statusFilter = '0: 2016';
    periods: Periodo[] = [];

    constructor(
        private expenditureService: GastoService,
        private periodService: PeriodoService,

    ) {
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    
    ngOnInit() {
        //Load periods dropdown
        this.periodService.getByStatus(1).subscribe(periods => { this.periods = periods; });
        this.onChange(this.statusFilter);
    }

    onChange(year) {
        this.expenditureService.getByPeriod(year.split(":")[1]).subscribe(expenditure => { this.model = expenditure; });
    }

    definirEstado(param) {
        if (param == 1) {
            return "Activo"
        } else {
            return "Inactivo"    
        }
    }

    definirTipo(param) {
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