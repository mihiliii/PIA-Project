import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LekarService {

    constructor(private httpClient: HttpClient) {}

    getLekarById(_id) {
        const requestData = {
            _id: _id
        };

        return this.httpClient.post('http://localhost:4000/lekar/getLekarById', requestData);
    }

    getAllLekari() {

        return this.httpClient.get('http://localhost:4000/lekar/getAllLekari');
    }

    addNewZakazaniPregled(requestData) {
        
        return this.httpClient.post('http://localhost:4000/lekar/addNewZakazaniPregled', requestData);
    }

    getPreglediIsteSpecijalizacije(specijalizacija) {
        const data = {
            specijalizacija: specijalizacija 
        };

        return this.httpClient.post('http://localhost:4000/lekar/getPreglediIsteSpecijalizacije', data);
    }

    updateLekarPregled(_id, pregledi) {
        let requestData = {
            _id: _id,
            pregledi: []
        }

        for (let pregled of pregledi) {
            if (pregled.checkbox === true) {
                requestData.pregledi.push(pregled._id);
            }
        }

        return this.httpClient.post('http://localhost:4000/lekar/updateLekarPregled', requestData);
    }

    getZakazaniPreglediByLekarId(_id) {
        let requestData = {
            _id: _id
        };

        return this.httpClient.post('http://localhost:4000/lekar/getZakazaniPreglediByLekarId', requestData);
    }

    addNewPregled(formInput) {

        return this.httpClient.post('http://localhost:4000/lekar/addNewPregled', formInput);
    }

    getAllIzvestaji(data) {
        
        return this.httpClient.get('http://localhost:4000/lekar/getAllIzvestaji', data);
    }

    createNewIzvestaj(data) {

        return this.httpClient.post('http://localhost:4000/lekar/createNewIzvestaj', data);
    }

}
