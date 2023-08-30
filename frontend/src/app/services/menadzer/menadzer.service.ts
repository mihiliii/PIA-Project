import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenadzerService {

  constructor(private httpClient: HttpClient) { }

    getRegisterRequests() {
        
        return this.httpClient.get('http://localhost:4000/menadzer/getRegisterRequests');
    }

    acceptRegisterRequests(acceptedRequests) {
        
        return this.httpClient.post('http://localhost:4000/menadzer/acceptRegisterRequests', acceptedRequests);
    }

    declineRegisterRequests(declinedRequests) {
        
        return this.httpClient.post('http://localhost:4000/menadzer/declineRegisterRequests', declinedRequests);
    }

    deleteUser(requestData) {
        
        return this.httpClient.post('http://localhost:4000/menadzer/deleteUser', requestData);
    }

    updateUser(requestData) {
        
        return this.httpClient.post('http://localhost:4000/menadzer/updateUser', requestData);
    }

    addNewLekar(requestData) {

        return this.httpClient.post('http://localhost:4000/menadzer/addNewLekar', requestData);
    }

    getAllPregledi() {
        
        return this.httpClient.get('http://localhost:4000/menadzer/getAllPregledi');
    }

    updateUserPassword(requestData) {

        return this.httpClient.post('http://localhost:4000/menadzer/updateUserPassword', requestData);
    }

    acceptPregledi(requestData) {

        return this.httpClient.post('http://localhost:4000/menadzer/acceptPregledi', requestData);
    } 

    declinePregledi(requestData) {

        return this.httpClient.post('http://localhost:4000/menadzer/declinePregledi', requestData);
    }

    addNewSpecijalizacija(requestData) {

        return this.httpClient.post('http://localhost:4000/menadzer/addNewSpecijalizacija', requestData);
    }

    getAllSpecijalizacija() {

        return this.httpClient.get('http://localhost:4000/menadzer/getAllSpecijalizacija');
    }

    updatePregled(requestData) {

        return this.httpClient.post('http://localhost:4000/menadzer/updatePregled', requestData);
    }

    deletePregled(requestData) {

        return this.httpClient.post('http://localhost:4000/menadzer/deletePregled', requestData);
    }
}
