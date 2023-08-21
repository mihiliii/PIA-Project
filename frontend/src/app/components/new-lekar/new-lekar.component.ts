import { Component, OnInit } from '@angular/core';
import { MenadzerService } from '../../services/menadzer/menadzer.service';

@Component({
  selector: 'app-new-lekar',
  templateUrl: './new-lekar.component.html',
  styleUrls: ['./new-lekar.component.css']
})
export class NewLekarComponent implements OnInit {

    formInput: {
        korisnickoIme: string;
        lozinka: string;
        ime: string;
        prezime: string;
        adresa: string;
        kontaktTelefon: string;
        email: string;
        brojLicence: string;
        specijalizacija: string;
        ogranakOrdinacije: string;
    };
    showComponent = false;

    constructor(private menadzerService: MenadzerService) { }

    ngOnInit(): void {
    }

    populateNewLekarComponent() {
        this.showComponent = true;
        this.formInput = {
            korisnickoIme: '',
            lozinka: '',
            ime: '',
            prezime: '',
            adresa: '',
            kontaktTelefon: '',
            email: '',
            brojLicence: '',
            specijalizacija: '',
            ogranakOrdinacije: '',
        }
    }

    addNewLekar() {

        this.menadzerService.addNewLekar(this.formInput).subscribe((response) => {
            console.log(response['message']);
            this.discardForm();
        });
    }

    discardForm() {
        this.formInput = undefined;
        this.showComponent = false;
    }

}
