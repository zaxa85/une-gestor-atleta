import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AtletaService, StorageService } from '../_services/index';
import { Atleta } from '../_models/index';
import { DatePipe } from '@angular/common';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';


@Component({
    templateUrl: 'atleta.registrar.component.html',
    styles: [`
    .preview img{
      max-height: 50px;
    }
  `],
    providers: [DatePipe]
})

export class AtletaRegistrarComponent {
    loading = false;
    private sub: Subscription;
    errorMessage: string;
    atleta: Atleta;
    statuses = [{ id: 1, name: "Activo" }, { id: 2, name: "Suspendido" }, { id: 0, name: "Inactivo" }];
    fileToUpload: File = null;
    imageSrc: string;
    private API_URL = environment.apiUrl;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private atletaService: AtletaService,
        private fileUploadService: StorageService,
        private datePipe: DatePipe,
        private alertService: AlertService) { }

    onFileChanged(event) {

        if (event.target.files && event.target.files[0]) {

            this.fileToUpload = event.target.files[0];
            this.atleta.imagen = this.fileToUpload.name;

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
        this.fileUploadService.postFile(this.fileToUpload, 'atletas').subscribe(data => {
            // do something, if upload success
        }, error => {
            console.log(error);
        });
    }

    // Main process
    register() {

        this.loading = true;
        // If Member is NaN, this will follow member creation
        if (isNaN(this.atleta.id)) {
            this.atletaService.create(this.atleta)
                .subscribe(
                    data => {
                        this.alertService.success('Registro exitoso', true);
                        this.router.navigate(['/atleta.listar']);
                    },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    });

        }
        else {
            this.atletaService.update(this.atleta)
                .subscribe(
                    data => {
                        this.alertService.success('Modificación exitosa', true);
                        this.router.navigate(['/atleta.listar']);
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

        //Initializing member
        this.atleta = new Atleta();
        this.atleta.estado = 1;
        this.atleta.idtipodocumento = "1";
        this.atleta.dni = "1";

        this.atleta.imagen = "default.jpg";
        this.atleta.fechacreacion = new Date();//this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        this.atleta.fechanacimiento = new Date(); //this.datePipe.transform(new Date(), 'yyyy-MM-dd');

        //Loading member if it exists

        this.sub = this.route.params
            .subscribe(
                params => {
                    let id = +params['id'];
                    if (!isNaN(id)) {
                        this.getMember(id);
                    }
                });

    }

    getMember(id: number) {
        this.atletaService.getById(id).subscribe(
            atleta => this.atleta = atleta,
            error => this.errorMessage = <any>error);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    dateChanged1(newDate) {
        this.atleta.fechanacimiento = newDate;
    }

    dateChanged2(newDate) {
        this.atleta.fechacreacion = newDate;
    }
}