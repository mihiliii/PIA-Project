import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Lekar from 'src/app/models/lekar.model';

@Injectable({
  providedIn: 'root'
})
export class TabelaLekaraService {

    lekarArray: Lekar[];
    sortIme: boolean;
    sortPrezime: boolean;
    sortSpecijalizacija: boolean;
    sortOgranakOrdinacije: boolean;

    constructor(private httpClient: HttpClient) { 
    }

    getLekari(){
        return this.httpClient.get('http://localhost:4000/lekar/getAllLekari');
    }

    setLekari(lekarArray) {
        this.lekarArray = lekarArray;
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
        this.sortOgranakOrdinacije = false;
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
        this.sortOgranakOrdinacije = false;
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
        this.sortOgranakOrdinacije = false;
        return returnArray;
    }

    sortByOgranak(): Lekar[] {
        let returnArray = this.lekarArray;
        returnArray = returnArray.sort((lekar1, lekar2) => {
            if (lekar1.ogranakOrdinacije > lekar2.ogranakOrdinacije) return 1;
            else if (lekar1.ogranakOrdinacije < lekar2.ogranakOrdinacije) return -1;
            else return 0;
        });
        if (this.sortOgranakOrdinacije) 
            returnArray = returnArray.reverse();
        this.sortOgranakOrdinacije = !this.sortOgranakOrdinacije;
        this.sortIme = false;
        this.sortPrezime = false;
        this.sortSpecijalizacija = false;
        return returnArray;
    }

    search(ime, prezime, specijalizacija, ogranak): Lekar[] {
        let returnArray = this.lekarArray;
        if (ime != '')
            returnArray = returnArray.filter((lekar) => { return lekar.ime.includes(ime); });
        if (prezime != '')
            returnArray = returnArray.filter((lekar) => { return lekar.prezime.includes(prezime); });
        if (specijalizacija != '')
            returnArray = returnArray.filter((lekar) => { return lekar.specijalizacija.includes(specijalizacija); });
        if (ogranak != '')
            returnArray = returnArray.filter((lekar) => { return lekar.specijalizacija.includes(ogranak); });
        return returnArray;
    }
}
