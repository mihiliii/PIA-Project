import { Component, OnInit } from '@angular/core';
import ZakazaniPregled from 'src/app/models/termin.model';
import { LekarService } from '../services/lekar.service';

@Component({
  selector: 'app-lekar-pregledi',
  templateUrl: './lekar-pregledi.component.html',
  styleUrls: ['./lekar-pregledi.component.css']
})
export class LekarPreglediComponent implements OnInit {

    zakazaniPregledArray: ZakazaniPregled[];

    constructor(private lekarService: LekarService) { }

    ngOnInit(): void {
        this.getZakazaniPregledi();
    }

    getZakazaniPregledi() {
        this.lekarService.getZakazaniPregledi(localStorage.getItem('_id')).subscribe((zakazaniPregledi: [any]) => {
            this.zakazaniPregledArray = zakazaniPregledi.slice(0, 3);;
            console.log(this.zakazaniPregledArray);
        })
    }

}
