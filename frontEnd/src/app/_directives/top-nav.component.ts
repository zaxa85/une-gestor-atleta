import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from '../_services';
import { Component, ViewChild } from '@angular/core';
import {
  MatSidenav
} from '@angular/material';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  @ViewChild('appDrawer') public sidenav: MatSidenav;
  imageUrl = '';

  isIn = false;   // store state
  isLogged = false;
  userFullName = '';
  userType = '';
  isAdmin = false;

  constructor(public navService: NavService,
    private router: Router) {
  }

  toggleState() { // click handler
    let bool = this.isIn;
    this.isIn = bool === false ? true : false;
  }

  ngOnInit() {

    if (localStorage.getItem('currentUser')) {
      this.isLogged = true;
      var loginUser = JSON.parse(localStorage.getItem('currentUser'));
      var role = localStorage.getItem('userRoles');

      this.userFullName = loginUser.username;
      this.userType = role;
      this.isAdmin = (role === "admin") ? true : false;
    } else {
      this.isLogged = false;
    }
  }


  ngDoCheck() {
    if (localStorage.getItem('currentUser')) {
      this.isLogged = true;
      var loginUser = JSON.parse(localStorage.getItem('currentUser'));
      var role = localStorage.getItem('userRoles');

      this.userFullName = loginUser.username;
      this.userType = role;
      this.isAdmin = (role === "admin") ? true : false;
    } else {
      this.isLogged = false;
    }
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');

    this.router.navigate(['/login']);
    this.isLogged = false;
    //this.sidenav.close();
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var userRoles: string[] = JSON.parse(localStorage.getItem('userRoles'));
    allowedRoles.forEach(element => {
      if (userRoles.indexOf(element) > -1) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;

  }
}