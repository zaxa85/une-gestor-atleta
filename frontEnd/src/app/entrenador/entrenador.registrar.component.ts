import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { Subscription } from 'rxjs/Subscription';
import { AlertService, EntrenadorService } from '../_services/index';
import { Entrenador } from '../_models/index';

@Component({
    templateUrl: 'entrenador.registrar.component.html'
})

export class EntrenadorRegistrarComponent {
    loading = false;
  //  private sub: Subscription;
    errorMessage: string;
    entrenador: Entrenador;

    statuses = [{ id: 1, name: "Activo" }, { id: 0, name: "Inactivo" }];
    documenttypes = [{ id: 1, name: "RUC" }, { id: 0, name: "DNI" }, { id: 3, name: "Otro" }];

    test: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private entrenadorService: EntrenadorService,
        private alertService: AlertService) { }

    // Main process
    register() {

        this.loading = true;

        // If Income is NaN, this will follow income creation
        if (isNaN(this.entrenador.id)) {

            this.entrenadorService.create(this.entrenador)
                .subscribe(
                data => {
                    this.alertService.success('Registro exitoso', true);
                    this.router.navigate(['/sponsor.list']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

        }
        else {

            this.entrenadorService.update(this.entrenador)
                .subscribe(
                data => {
                    this.alertService.success('Modificación exitosa', true);
                    this.router.navigate(['/sponsor.list']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
        }
    }

    //Initializing screen values
    ngOnInit(): void {

        //Initializing income
        this.entrenador = new Entrenador();
        this.entrenador.estado = 1;
       // this.entrenador.tipo = 1;

        //Loading income if it exists
        /*
        this.sub = this.route.params
            .subscribe(
            params => {
                let id = +params['id'];
                if (!isNaN(id)) {
                    this.getSponsor(id);
                }
            });
            */

    }

    getSponsor(id: number) {
        this.entrenadorService.getById(id).subscribe(
            entrenador => this.entrenador = entrenador,
            error => this.errorMessage = <any>error);
    }

    ngOnDestroy() {
//this.sub.unsubscribe();
    }
}