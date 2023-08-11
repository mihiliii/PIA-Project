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

    idLekara: string;
    lekar: Lekar;
    lekarImageUrl: string;
    pregledArray: Pregled[];
    formInput: {
        pregled: Pregled | string,
        datum: Date,
        vreme: Time
    };
    zakaziPregledMessage: string;

    constructor(private lekarService: LekarService, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.idLekara = this.activatedRoute.snapshot.paramMap.get('id');
        this.formInput = {
            pregled: null,
            datum: null,
            vreme: null
        }
        this.getLekar();
    }

    getLekar() {
        this.lekarService.getLekar(this.idLekara).subscribe((lekar: any) => {
            this.lekar = lekar;
            this.pregledArray = lekar.pregledi;
            this.lekarImageUrl = 'http://localhost:4000/images/' + this.lekar.image;
        });
    }
    
    zakaziPregled() {
        if (this.formInput.pregled == null || this.formInput.datum == null || this.formInput.vreme == null){
            this.zakaziPregledMessage = 'Error: popuniti sva polja!';
            return;
        }

        const data = {
            lekar: this.lekar,
            pacijent: localStorage.getItem('_id'),
            pregled: this.formInput.pregled,
            datum: this.formInput.datum,
            vreme: this.formInput.vreme
        }
        
        this.lekarService.zakaziPregled(data).subscribe((response) => {
            this.zakaziPregledMessage = 'Termin je ' + response['message'];
        });
    }

}
