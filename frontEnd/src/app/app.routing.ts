import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { AtletaListarComponent, AtletaRegistrarComponent } from './atleta/index';
import { EntrenadorListarComponent, EntrenadorRegistrarComponent } from './entrenador/index';

import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },

    { path: 'atleta.listar', component: AtletaListarComponent, canActivate: [AuthGuard] },
    { path: 'atleta.registrar', component: AtletaRegistrarComponent, canActivate: [AuthGuard] },
    {
        path: 'atleta.registrar/:id',
        canActivate: [AuthGuard], component: AtletaRegistrarComponent
    },


    { path: 'entrenador.listar', component: EntrenadorListarComponent, canActivate: [AuthGuard] },
    { path: 'entrenador.registrar', component: EntrenadorRegistrarComponent, canActivate: [AuthGuard] },
    {
        path: 'entrenador.registrar/:id',
        canActivate: [AuthGuard], component: EntrenadorRegistrarComponent
    },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);