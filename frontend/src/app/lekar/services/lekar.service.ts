import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LekarService {

    constructor(private httpClient: HttpClient) {}

    getLekar(id) {
        const data = {
            id: id
        };

        return this.httpClient.post('http://localhost:4000/lekar/getLekar', data);
    }

    zakaziPregled(data) {
        return this.httpClient.post('http://localhost:4000/lekar/zakaziPregled', data);
    }

}
