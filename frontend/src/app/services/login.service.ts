import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private httpClient: HttpClient) {}

    login(username, password) {

        const data = {
            username: username,
            password: password
        };

        return this.httpClient.post('http://localhost:4000/login/login', data);
    }
}
