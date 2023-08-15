import { Component, OnInit } from '@angular/core';
import Lekar from '../../models/lekar.model';
import { Router } from '@angular/router';
import { TabelaLekaraService } from '../services/tabela-lekara.service';

@Component({
  selector: 'app-tabela-lekara',
  templateUrl: './tabela-lekara.component.html',
  styleUrls: ['./tabela-lekara.component.css']
})
export class TabelaLekaraComponent implements OnInit {

    lekarList: Lekar[];
    formInput: {
        ime: string,
        prezime: string,
        specijalizacija: string,
        ogranak: string
    };

    constructor(private tabelaService: TabelaLekaraService, protected router: Router) { 
    }

    ngOnInit(): void {
        this.tabelaService.getAllLekari().subscribe((lekari: Lekar[]) => {
            this.lekarList = lekari;
            this.tabelaService.setLekari(this.lekarList);
        });
        this.formInput = {
            ime: '',
            prezime: '',
            specijalizacija: '',
            ogranak: ''
        };
    }

    sortRow(row) {
        switch (row) {
            case 0:
                this.tabelaService.sortByIme();
                break;
            case 1:
                this.tabelaService.sortByPrezime();
                break;
            case 2:
                this.tabelaService.sortBySpecijalizacija();
                break;
            case 3:
                this.tabelaService.sortByOgranak();
                break;
        }
    }

    search() {
        this.lekarList = this.tabelaService.search(this.formInput.ime, this.formInput.prezime, this.formInput.specijalizacija, this.formInput.ogranak);
    }

    

}
