import { Component, OnInit } from '@angular/core';
import ZakazaniPregled from 'src/app/models/zakazaniPregled.model';
import { LekarService } from '../../../services/lekar/lekar.service';
import Pacijent from 'src/app/models/pacijent.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lekar-pregledi',
  templateUrl: './lekar-pregledi.component.html',
  styleUrls: ['./lekar-pregledi.component.css']
})
export class LekarPreglediComponent implements OnInit {

    zakazaniPreglediList: ZakazaniPregled[];
    formInput: {
        razlogDolaska: string,
        dijagnoza: string,
        terapija: string,
        datumSledecegPregleda: string
    }
    trenutniDatum: Date;
    trenutnoVreme: string;

    constructor(private lekarService: LekarService, private router: Router) { }

    ngOnInit(): void {
        this.populateLekarPreglediComponent();
    }

    populateLekarPreglediComponent() {
        this.trenutniDatum = new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate());
        this.trenutnoVreme = new Date().getHours() + ':' + new Date().getMinutes();

        this.lekarService.getZakazaniPreglediByLekarId(localStorage.getItem('_id')).subscribe((zakazaniPregledi: ZakazaniPregled[]) => {
            this.zakazaniPreglediList = zakazaniPregledi.slice(0, 3);
            this.zakazaniPreglediList.map((zakazaniPregled) => {
                zakazaniPregled['showIzvestaj'] = false;
                let datumZakazanogPregleda = new Date(zakazaniPregled.datum);
                if (datumZakazanogPregleda < this.trenutniDatum || (datumZakazanogPregleda == this.trenutniDatum && zakazaniPregled.vreme <= this.trenutnoVreme)) {
                    zakazaniPregled['gotovPregled'] = true;
                }
                else {
                    zakazaniPregled['gotovPregled'] = false;
                }
            });
        })
    }

    otvoriKartonPacijenta(pacijent) {
        this.router.navigate(['/lekar/karton/', {_id: pacijent._id}]);
    }

    otvoriIzvestaj(zakazaniPregled) {
        this.formInput = {
            razlogDolaska: '',
            dijagnoza: '',
            terapija: '',
            datumSledecegPregleda: ''
        }
        zakazaniPregled['showIzvestaj'] = true;
    }

    zatvoriIzvestaj(zakazaniPregled) {
        zakazaniPregled['showIzvestaj'] = false;
    }

    napraviIzvestaj(zakazaniPregled: ZakazaniPregled) {
        const izvestaj = {
            zakazaniPregledId: zakazaniPregled._id,
            lekar: localStorage.getItem('_id'),
            pacijent: zakazaniPregled.pacijent,
            datum: zakazaniPregled.datum,
            vreme: zakazaniPregled.vreme,
            razlogDolaska: this.formInput.razlogDolaska,
            dijagnoza: this.formInput.dijagnoza,
            terapija: this.formInput.terapija,
            datumSledecegPregleda: this.formInput.datumSledecegPregleda
        }

        this.lekarService.createNewIzvestaj(izvestaj).subscribe((response) => {
            console.log(response['message']);
            this.zatvoriIzvestaj(zakazaniPregled);
            this.ngOnInit();
        });
    }

}
