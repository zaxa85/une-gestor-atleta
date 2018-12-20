import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse,  } from '@angular/common/http';

import { User } from '../_models/index';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

    private API_URL = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(this.API_URL + `/api/users2`);
    }

    getById(id: number) {
        return this.http.get(this.API_URL + `/api/users2/${id}`);
    }

    register(user: User) {
        return this.http.post(this.API_URL + `/api/users2/register`, user);
    }

    update(user: User) {
        return this.http.put(this.API_URL + `/api/users2/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(this.API_URL + `/api/users2/${id}`);
    }
}