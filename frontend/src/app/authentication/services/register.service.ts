import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    constructor(private httpClient: HttpClient) {}

    registerPacijent(pacijent) {
        return this.httpClient.post('http://localhost:4000/register/registerPacijent', pacijent);
    }

    uploadImage(image) {
        return this.httpClient.post('http://localhost:4000/register/uploadImage', image);
    }

    getRegisterRequests() {
        return this.httpClient.get('http://localhost:4000/register/getRegisterRequests');
    }

    acceptRegisterRequests(acceptedRequests) {
        return this.httpClient.post('http://localhost:4000/register/acceptRegisterRequests', acceptedRequests);
    }

    declineRegisterRequests(declinedRequests) {
        return this.httpClient.post('http://localhost:4000/register/declineRegisterRequests', declinedRequests);
    }

}
