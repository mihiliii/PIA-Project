import { Component, OnInit } from '@angular/core';
import Lekar from '../models/lekar.model';
import { HomepageService } from '../services/homepage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tabela-lekara',
  templateUrl: './tabela-lekara.component.html',
  styleUrls: ['./tabela-lekara.component.css']
})
export class TabelaLekaraComponent implements OnInit {

    lekari: Lekar[];
    ime: string;
    prezime: string;
    specijalizacija: string;
    ogranak: string;

    constructor(private homepageService: HomepageService, protected router: Router) { 
    }

    ngOnInit(): void {
        this.homepageService.getLekari().subscribe((lekari: Lekar[]) => {
            this.lekari = lekari;
            this.homepageService.setLekari(this.lekari);
        });
        this.ime = this.prezime = this.specijalizacija = '';
    }

    sortRow(row) {
        switch (row) {
            case 0:
                this.homepageService.sortByIme();
                break;
            case 1:
                this.homepageService.sortByPrezime();
                break;
            case 2:
                this.homepageService.sortBySpecijalizacija();
                break;
            case 3:
                this.homepageService.sortByOgranak();
                break;
        }
    }

    search() {
        this.lekari = this.homepageService.search(this.ime, this.prezime, this.specijalizacija, this.ogranak);
    }

    

}
