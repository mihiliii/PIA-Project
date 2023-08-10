import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    constructor(private httpClient: HttpClient) { }

    login(loginData) {
        return this.httpClient.post('http://localhost:4000/authentication/login', loginData);
    }

    registerPacijent(pacijent) {
        return this.httpClient.post('http://localhost:4000/authentication/registerPacijent', pacijent);
    }

    uploadImage(image) {
        return this.httpClient.post('http://localhost:4000/authentication/uploadImage', image);
    }

    getRegisterRequests() {
        return this.httpClient.get('http://localhost:4000/authentication/getRegisterRequests');
    }

    acceptRegisterRequests(acceptedRequests) {
        return this.httpClient.post('http://localhost:4000/authentication/acceptRegisterRequests', acceptedRequests);
    }

    declineRegisterRequests(declinedRequests) {
        return this.httpClient.post('http://localhost:4000/authentication/declineRegisterRequests', declinedRequests);
    }
    
}
