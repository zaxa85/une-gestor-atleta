import { Component, OnInit } from '@angular/core';
import { Atleta } from '../_models/index';
import { User } from '../_models/index';
import { AtletaService } from '../_services/index';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'programalist',
    templateUrl: 'programa.listar.component.html',
    providers: [DatePipe]
})

export class ProgramaListarComponent implements OnInit {
    currentUser: User;
    atletas: Atleta[] = [];
    statuses = [{ id: 1, name: "Activo" }, { id: 2, name: "Suspendido" }, { id: 0, name: "Inactivo" }, { id: -1, name: "Todos" }];
    statusFilter = 1;
    isAdmin = false;

    constructor(
        private atletaService: AtletaService,
        private datePipe: DatePipe
        ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var role = localStorage.getItem('userRoles');
        this.isAdmin = (role === "admin") ? true : false;
    }

    ngOnInit() {
        this.onChange(this.statusFilter);
    }

    deleteMember(id: number) {

        var retVal = confirm("Esta seguro de eliminar al atleta seleccionado?");
        if (retVal == true) {
            this.atletaService.delete(id).subscribe(() => { this.loadAllUsers(1) });
            return true;
        }
        else {
            return false;
        }
    }

    private loadAllUsers(status : number) {
        this.atletaService.getByStatus(status).subscribe(atletas => { this.atletas = atletas; });
    }
    
    showStatusDescription(status : number) : string {
        if (status == 1) {
            return "Activo";
        } else if (status == 2) {
            return "Suspendido";
        } else if (status == 0) {
            return "Inactivo";
        } else {
            return "Indeterminado" ;
        }
    }
    
    onChange(status) {        
       if (status != -1) {
            this.atletaService.getByStatus(status).subscribe(atletas => { this.atletas = atletas; });
       } else {
           this.atletaService.getAll().subscribe(atletas => { this.atletas = atletas; });
       }
    }
}