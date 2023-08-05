import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private httpClient: HttpClient) {}

    login(username, password, userType) {
        const loginData = {
            korisnickoIme: username,
            lozinka: password,
            userType: userType
        };

        return this.httpClient.post('http://localhost:4000/login/login', loginData);
    }
}
