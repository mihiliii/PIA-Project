import { Component, OnInit } from '@angular/core';
import ZakazaniPregled from 'src/app/models/zakazaniPregled.model';
import { LekarService } from '../services/lekar.service';

@Component({
  selector: 'app-lekar-pregledi',
  templateUrl: './lekar-pregledi.component.html',
  styleUrls: ['./lekar-pregledi.component.css']
})
export class LekarPreglediComponent implements OnInit {

    zakazaniPreglediList: ZakazaniPregled[];

    constructor(private lekarService: LekarService) { }

    ngOnInit(): void {
        this.populateLekarPreglediComponent();
    }

    populateLekarPreglediComponent() {
        this.lekarService.getZakazaniPreglediByLekarId(localStorage.getItem('_id')).subscribe((zakazaniPregledi: ZakazaniPregled[]) => {
            this.zakazaniPreglediList = zakazaniPregledi.slice(0, 3);;
        })
    }

}
