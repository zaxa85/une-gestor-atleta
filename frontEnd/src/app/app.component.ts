import { Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { VERSION } from '@angular/material';
import { NavItem } from './_models';
import { NavService } from './_services';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'material-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  @ViewChild('appDrawer') appDrawer: ElementRef;
  version = VERSION;
  navItems: NavItem[] = [

    {
      displayName: 'Gestión de Socios',
      iconName: 'face',
      route: 'member.list',
    },

    {
      displayName: 'Gestión Deportiva',
      iconName: 'fitness_center',
      route: '',
      children: [
        {
          displayName: 'Calendario de Eventos',
          iconName: 'group',
          route: 'sport.list'
        },
        {
          displayName: 'Gestor de Competencias',
          iconName: 'speaker_notes',
          route: 'sport.event'
        },
        {
          displayName: 'Rendimiento del Equipo',
          iconName: 'feedback',
          route: 'sport.team'
        }
      ]
    },

    {
      displayName: 'Gestión de Patrocinadores',
      iconName: 'business_center',
      route: 'sponsor.list',
    },

    {
      displayName: 'Gestión Financiera',
      iconName: 'attach_money',
      route: '',
      children: [
        {
          displayName: 'Registro de Aportes de Socios',
          iconName: 'group',
          route: 'control.payment'
        },
        {
          displayName: 'Registro de Ingresos',
          iconName: 'speaker_notes',
          route: 'income.list'
        },
        {
          displayName: 'Registro de Compras / Gastos',
          iconName: 'feedback',
          route: 'expenditure.list'
        },
        {
          displayName: 'Consulta de Aporte Individual',
          iconName: 'feedback',
          route: 'payment.list'
        },
        {
          displayName: 'Balance',
          iconName: 'feedback',
          route: 'control.balance'
        }
      ]
    },
    {
      displayName: 'Salir',
      iconName: 'power_settings_new',
      route: 'javascript: alert(\'test\')',
    },
  ];

  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;

  constructor(private navService: NavService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
      this.mobileQuery = media.matchMedia('(max-width: 400px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
  }
  
  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }
}
