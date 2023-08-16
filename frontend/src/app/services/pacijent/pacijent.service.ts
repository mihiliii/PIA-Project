import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PacijentService {

    constructor(private httpClient: HttpClient) {}

    getAllPacijenti() {
        return this.httpClient.get('http://localhost:4000/pacijent/getAllPacijenti');
    }

    getPacijentById(pacijentId) {
        const requestData = {
            _id: pacijentId
        };

        return this.httpClient.post('http://localhost:4000/pacijent/getPacijentById', requestData);
    }

    getZakazaniPreglediListByPacijentId(pacijentId) {
        const requestData = {
            pacijent: pacijentId
        }

        return this.httpClient.post('http://localhost:4000/pacijent/getZakazaniPreglediListByPacijentId', requestData);
    }

    deleteZakazaniPregled(pregledId) {
        const requestData = {
            _id: pregledId
        };

        return this.httpClient.post('http://localhost:4000/pacijent/deleteZakazaniPregled', requestData);
    }

}
