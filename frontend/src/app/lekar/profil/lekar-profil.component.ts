import { Component, OnInit } from '@angular/core';
import Lekar from '../../models/lekar.model';
import { LekarService } from '../services/lekar.service';
import { ActivatedRoute } from '@angular/router';
import Pregled from '../../models/pregled.model';
import { Time } from '@angular/common';

@Component({
  selector: 'app-lekar-profil',
  templateUrl: './lekar-profil.component.html',
  styleUrls: ['./lekar-profil.component.css']
})
export class LekarProfilComponent implements OnInit {

    userType: string;
    idLekara: string;
    lekar: Lekar;
    lekarImageUrl: string;
    preglediIsteSpecijalizacije;
    formInput: {
        pregled: Pregled | string,
        datum: Date,
        vreme: Time
    };
    zakaziPregledMessage: string;

    constructor(private lekarService: LekarService, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.userType = localStorage.getItem('userType');
        if (this.userType == 'pacijent')
            this.idLekara = this.activatedRoute.snapshot.paramMap.get('id');
        else 
            this.idLekara = localStorage.getItem('_id');
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

            this.lekarService.getPreglediIsteSpecijalizacije(lekar.specijalizacija).subscribe((pregledi: Pregled[]) => {

                pregledi = pregledi.map((pregled: Pregled) => {
                    pregled['checkbox'] = this.lekar.pregledi.some((obj) => {
                        return obj._id == pregled._id;
                    });
                    return pregled;
                });

                this.preglediIsteSpecijalizacije = pregledi;
            });

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

    updatePregled() {
        this.lekarService.updatePregled(this.lekar._id, this.preglediIsteSpecijalizacije).subscribe(() => {
            
        });
    }

}
