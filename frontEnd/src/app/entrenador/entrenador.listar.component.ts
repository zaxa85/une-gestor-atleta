import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, EntrenadorService } from '../_services/index';
import { Subscription } from 'rxjs';
import { Entrenador } from '../_models/index';

@Component({
    templateUrl: 'entrenador.listar.component.html'
})

export class EntrenadorListarComponent {
    loading = false;
    errorMessage: string;
    entrenador: Entrenador;
    model: any;

    statuses = [{ id: 1, name: "Activo" }, { id: 0, name: "Inactivo" }];
    types = [{ id: 1, name: "Auspicio" }, { id: 2, name: "Donación" }, { id: 3, name: "Ganancia" }, { id: 0, name: "Otro" }];
    test: string;

    constructor(
        private entrenadorService: EntrenadorService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        //Load periods dropdown
        this.onChange(1);
    }

    onChange(status) {
        this.entrenadorService.getAll().subscribe(entrenador => { this.model = entrenador; });
    }

    definirEstado(param) {
        if (param == 1) {
            return "Activo"
        } else {
            return "Inactivo"
        }
    }

    definirTipoDocumento(param) {
        if (param == 1) {
            return "RUC"
        }
        else if (param == 2) {
            return "DNI"

        } else {
            return "Otro"
        }
    }
}
