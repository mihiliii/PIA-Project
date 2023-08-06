import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HomepageService {

    constructor(private httpClient: HttpClient) { }

    getAllLekari() {
        return this.httpClient.get('http://localhost:4000/homepage/getLekari');
    }
}
