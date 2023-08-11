import { Component, OnInit } from '@angular/core';
import Lekar from '../models/lekar.model';
import { LekarService } from '../pacijent/services/lekar.service';
import { ActivatedRoute } from '@angular/router';
import Pregled from '../models/pregled.model';
import { Time } from '@angular/common';

@Component({
  selector: 'app-lekar',
  templateUrl: './lekar.component.html',
  styleUrls: ['./lekar.component.css']
})
export class LekarComponent implements OnInit {

    id: string;
    lekar: Lekar;
    pregledi: Pregled[];
    pregledForm: Pregled;
    datumForm: Date;
    vremeForm: Time;
    imageUrl: string;

    constructor(private lekarService: LekarService, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
        this.getLekar();
    }

    getLekar() {
        this.lekarService.getLekar(this.id).subscribe((lekar: any) => {
            this.lekar = lekar['lekar'];
            this.pregledi = lekar['pregledi'];
            this.imageUrl = 'http://localhost:4000/images/' + this.lekar.image; 
        });
    }
    
    click() {
        const data = {
            pregled: this.pregledForm,
            lekar: this.lekar,
            pacijent: localStorage.getItem('_id'),
            datum: this.datumForm,
            vreme: this.vremeForm
        }
        
        this.lekarService.zakaziPregled(data).subscribe((response) => {

        });
    }

}
