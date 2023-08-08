import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PacijentService {

    constructor(private httpClient: HttpClient) {}

    getPacijent(korisnickoIme) {
        const data = {
            korisnickoIme: korisnickoIme
        };

        return this.httpClient.post('http://localhost:4000/pacijent/getPacijent', data);
    }

}
