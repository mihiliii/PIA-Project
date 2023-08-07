import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Lekar from '../models/lekar.model';

@Injectable({
    providedIn: 'root'
})
export class HomepageService {

    lekarArray: Lekar[];
    sortIme: boolean;
    sortPrezime: boolean;
    sortSpecijalizacija: boolean;

    constructor(private httpClient: HttpClient) { 
    }

    getLekari(){
        return this.httpClient.get('http://localhost:4000/homepage/getLekari');
    }

    setLekari(lekarArray) {
        this.lekarArray = lekarArray;
        console.log(lekarArray);
    }

    sortByIme(): Lekar[] {
        let returnArray = this.lekarArray;
        returnArray = returnArray.sort((lekar1, lekar2) => {
            if (lekar1.ime > lekar2.ime) return 1;
            else if (lekar1.ime < lekar2.ime) return -1;
            else return 0;
        });
        if (this.sortIme) 
            returnArray = returnArray.reverse();
        this.sortIme = !this.sortIme;
        this.sortPrezime = false;
        this.sortSpecijalizacija = false;
        return returnArray;
    }

    sortByPrezime(): Lekar[] {
        let returnArray = this.lekarArray;
        returnArray = returnArray.sort((lekar1, lekar2) => {
            if (lekar1.prezime > lekar2.prezime) return 1;
            else if (lekar1.prezime < lekar2.prezime) return -1;
            else return 0;
        });
        if (this.sortPrezime) 
            returnArray = returnArray.reverse();
        this.sortPrezime = !this.sortPrezime;
        this.sortIme = false;
        this.sortSpecijalizacija = false;
        return returnArray;
    }

    sortBySpecijalizacija(): Lekar[] {
        let returnArray = this.lekarArray;
        returnArray = returnArray.sort((lekar1, lekar2) => {
            if (lekar1.specijalizacija > lekar2.specijalizacija) return 1;
            else if (lekar1.specijalizacija < lekar2.specijalizacija) return -1;
            else return 0;
        });
        if (this.sortSpecijalizacija) 
            returnArray = returnArray.reverse();
        this.sortSpecijalizacija = !this.sortSpecijalizacija;
        this.sortIme = false;
        this.sortPrezime = false;
        return returnArray;
    }

    search(ime, prezime, specijalizacija): Lekar[] {
        let returnArray = this.lekarArray;
        if (ime != '')
            returnArray = returnArray.filter((lekar) => { return lekar.ime.includes(ime); });
        if (prezime != '')
            returnArray = returnArray.filter((lekar) => { return lekar.prezime.includes(prezime); });
        if (specijalizacija != '')
            returnArray = returnArray.filter((lekar) => { return lekar.specijalizacija.includes(specijalizacija); });
        return returnArray;
    }

}
