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
}
