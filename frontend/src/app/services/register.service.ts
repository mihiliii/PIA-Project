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

    registerLekar(lekar) {
        return this.httpClient.post('http://localhost:4000/register/registerLekar', lekar);
    }

    uploadImage(image) {
        return this.httpClient.post('http://localhost:4000/register/uploadImage', image);
    }
}
