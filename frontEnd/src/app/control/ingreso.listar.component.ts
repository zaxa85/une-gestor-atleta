import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Periodo } from '../_models/index';

import { AlertService, AuthenticationService, IngresoService, PeriodoService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'income.list.component.html'
})

export class IncomeListComponent {
    //currentUser: User;
    model: any;
    statusFilter = '0: 2016';
    periods: Periodo[] = [];

    constructor(
        private incomeService: IngresoService,
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
        this.incomeService.getByPeriod(year.split(":")[1]).subscribe(income => { this.model = income; });
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
}