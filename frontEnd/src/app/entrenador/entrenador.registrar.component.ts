import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { Subscription } from 'rxjs/Subscription';
import { AlertService, EntrenadorService, StorageService } from '../_services/index';
import { Entrenador } from '../_models/index';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: 'entrenador.registrar.component.html'
})

export class EntrenadorRegistrarComponent {
    loading = false;
    private sub: Subscription;
    errorMessage: string;
    entrenador: Entrenador;

    statuses = [{ id: 1, name: "Activo" }, { id: 0, name: "Inactivo" }];
    documenttypes = [{ id: 1, name: "RUC" }, { id: 0, name: "DNI" }, { id: 3, name: "Otro" }];

    fileToUpload: File = null;
    imageSrc: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private entrenadorService: EntrenadorService,
        private fileUploadService: StorageService,
        private alertService: AlertService) { }

    onFileChanged(event) {

        if (event.target.files && event.target.files[0]) {

            this.fileToUpload = event.target.files[0];
            this.entrenador.imagen = this.fileToUpload.name;

            const reader = new FileReader();

            reader.onload = (event: any) => {
                (<HTMLImageElement>document.getElementById('preview_image')).src = event.target.result
            }

            reader.readAsDataURL(this.fileToUpload);

            const formData2 = new FormData();
            formData2.append(name, this.fileToUpload, this.fileToUpload.name);
        }
    }

    uploadFileToActivity() {
        this.fileUploadService.postFile(this.fileToUpload, 'entrenadores').subscribe(data => {
            // do something, if upload success
        }, error => {
            console.log(error);
        });
    }

    // Main process
    register() {

        this.loading = true;

        // If Income is NaN, this will follow income creation
        if (isNaN(this.entrenador.id)) {

            this.entrenadorService.create(this.entrenador)
                .subscribe(
                    data => {
                        this.alertService.success('Registro exitoso', true);
                        this.router.navigate(['/entrenador.listar']);
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
                        this.router.navigate(['/entrenador.listar']);
                    },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    });
        }

        this.uploadFileToActivity();
    }

    //Initializing screen values
    ngOnInit(): void {

        //Initializing income
        this.entrenador = new Entrenador();
        this.entrenador.estado = 1;
        this.entrenador.idtipodocumento = "1";
        this.entrenador.dni = "1";

        this.entrenador.imagen = "default.jpg";
        this.entrenador.fechacreacion = new Date();//this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        this.entrenador.fechanacimiento = new Date(); //this.datePipe.transform(new Date(), 'yyyy-MM-dd');

        //Loading income if it exists

        this.sub = this.route.params
            .subscribe(
                params => {
                    let id = +params['id'];
                    if (!isNaN(id)) {
                        this.getEntrenador(id);
                    }
                });


    }

    getEntrenador(id: number) {
        this.entrenadorService.getById(id).subscribe(
            entrenador => this.entrenador = entrenador,
            error => this.errorMessage = <any>error);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}