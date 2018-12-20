import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent, TopNavComponent, MenuListItemComponent } from './_directives/index';

import { AuthGuard } from './_guards/index';
import {
  AlertService,
  AuthenticationService,
  UserService,
  AtletaService,
  EntrenadorService,
  StorageService,
  NavService
} from './_services/index';

import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';

import { AtletaListarComponent } from './atleta/index';
import { AtletaRegistrarComponent } from './atleta/index';
import { EntrenadorListarComponent } from './entrenador/index';
import { EntrenadorRegistrarComponent } from './entrenador/index';
import { ProgramaListarComponent } from './programa/index';
import { ProgramaRegistrarComponent } from './programa/index';
import { ProgramaAsignarComponent } from './programa/index';

import { CustomErrorHandler } from './_shared/index';

import {
  MatMenuModule, MatIconModule, MatButtonModule, MatSidenavModule, MatToolbarModule,
  MatListModule, MatExpansionModule, MatFormFieldModule, MatCardModule, MatInputModule
} from '@angular/material';

import { CdkTableModule } from '@angular/cdk/table';
import { OverlayModule } from '@angular/cdk/overlay';
import { MediaMatcher } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  exports: [
    // CDk
    CdkTableModule,
    OverlayModule,
    // Material
    MatMenuModule, MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule, 
    MatListModule, MatExpansionModule, MatFormFieldModule, MatCardModule, MatInputModule
  ]
})

export class SharedMaterialModule { }

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    TopNavComponent,
    MenuListItemComponent,
    HomeComponent,
    EntrenadorListarComponent, EntrenadorRegistrarComponent,
    AtletaListarComponent,AtletaRegistrarComponent,
    ProgramaListarComponent, ProgramaRegistrarComponent, ProgramaAsignarComponent,
    LoginComponent, 

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    routing,
    FlexLayoutModule,
    HttpClientModule

  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    NavService,
    UserService,
    MediaMatcher,
    StorageService,
    AtletaService,
    EntrenadorService
    //{ provide: ErrorHandler, useClass: CustomErrorHandler } // overrride default error handler
  ],
  bootstrap: [AppComponent]
})



export class AppModule { }
