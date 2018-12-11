import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/index';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

    private API_URL = environment.apiUrl;

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }


    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(login: string, password: string) {
        return this.http.get<any>(this.API_URL + '/api/users2/count', {
            params:
                { where: JSON.stringify({ login: login, password: password }) }
        }).pipe(map(user => {
            if (user && user.count > 0) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                //localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('currentUser', JSON.stringify({ login: login, password: password }));

                if (login === "admin") {
                    localStorage.setItem('userRoles', "admin");
                } else {
                    localStorage.setItem('userRoles', "user");

                }

            }
            else {
                throw "Usuario o contraseña incorrecto";
            }
        }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userRoles');

    }
}