import { Component, OnInit } from '@angular/core';
import Lekar from '../../../models/lekar.model';
import { LekarService } from '../../../services/lekar/lekar.service';
import { ActivatedRoute } from '@angular/router';
import Pregled from '../../../models/pregled.model';
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
    preglediIsteSpecijalizacije;
    formInput: {
        pregled: Pregled | string,
        datum: Date,
        vreme: Time
    };
    zakaziPregledMessage: string;

    constructor(private lekarService: LekarService, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.lekar = null;

        this.userType = localStorage.getItem('userType');

        this.idLekara = this.userType != 'lekar' ? this.activatedRoute.snapshot.paramMap.get('idLekara') : localStorage.getItem('_id');
            
        this.formInput = {
            pregled: null,
            datum: null,
            vreme: null
        }

        this.populateLekarProfilComponent();
    }

    populateLekarProfilComponent() {

        this.lekarService.getLekarById(this.idLekara).subscribe((lekar: Lekar) => {
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

        });
    }
    
    addNewZakazaniPregledByPacijent() {
        if (this.formInput.pregled == null || this.formInput.datum == null || this.formInput.vreme == null){
            this.zakaziPregledMessage = 'Error: popuniti sva polja!';
            return;
        }

        const zakazaniPregled = {
            lekar: this.lekar,
            pacijent: localStorage.getItem('_id'),
            pregled: this.formInput.pregled,
            datum: this.formInput.datum,
            vreme: this.formInput.vreme
        }
        
        this.lekarService.addNewZakazaniPregled(zakazaniPregled).subscribe((response) => {
            this.zakaziPregledMessage = 'Termin je ' + response['message'];
        });
    }

    updateLekarPregled() {
        this.lekarService.updateLekarPregled(this.lekar._id, this.preglediIsteSpecijalizacije).subscribe(() => {
            
        });
    }

}
