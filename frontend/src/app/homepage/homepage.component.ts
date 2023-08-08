import { Component, OnInit } from '@angular/core';
import Lekar from '../models/lekar.model';
import { HomepageService } from '../services/homepage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

    lekari: Lekar[];
    ime: string;
    prezime: string;
    specijalizacija: string;

    constructor(private homepageService: HomepageService, private router: Router) { }

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
        }
    }

    search() {
        this.lekari = this.homepageService.search(this.ime, this.prezime, this.specijalizacija);
    }

    goToLogin() {
        this.router.navigate(['login']);
    }

}
