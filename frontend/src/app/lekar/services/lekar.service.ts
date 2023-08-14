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

    getPreglediIsteSpecijalizacije(specijalizacija) {
        const data = {
            specijalizacija: specijalizacija 
        };

        return this.httpClient.post('http://localhost:4000/lekar/getPreglediIsteSpecijalizacije', data);
    }

    updatePregled(_id, pregledi) {
        let requestData = {
            _id: _id,
            pregledi: []
        }

        for (let pregled of pregledi) {
            if (pregled.checkbox === true) {
                requestData.pregledi.push(pregled._id);
            }
        }

        return this.httpClient.post('http://localhost:4000/lekar/updatePregled', requestData);
    }

    getZakazaniPregledi(_id) {
        let requestData = {
            _id: _id
        };

        return this.httpClient.post('http://localhost:4000/lekar/getAllTermini', requestData);
    }

    addNoviPregled(formInput) {
        console.log(formInput);

        return this.httpClient.post('http://localhost:4000/lekar/addNoviPregled', formInput);
    }

}
