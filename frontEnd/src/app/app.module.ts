import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './_directives/index';
import { TopNavComponent } from './_directives/index';
import { MenuListItemComponent } from './_directives/index';

import { MediaMatcher } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HttpClientModule } from '@angular/common/http'

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


import { CustomErrorHandler } from './_shared/index';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import {
  MatMenuModule, MatIconModule, MatButtonModule, MatSidenavModule, MatToolbarModule,
  MatListModule, MatExpansionModule, MatFormFieldModule
} from '@angular/material';

import { CdkTableModule } from '@angular/cdk/table';
import { OverlayModule } from '@angular/cdk/overlay';



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
    EntrenadorListarComponent,
    EntrenadorRegistrarComponent,
    AtletaListarComponent,
    AtletaRegistrarComponent,
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
