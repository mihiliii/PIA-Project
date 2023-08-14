import { Component, OnInit } from '@angular/core';
import { LekarService } from '../services/lekar.service';

@Component({
  selector: 'app-razno',
  templateUrl: './razno.component.html',
  styleUrls: ['./razno.component.css']
})
export class RaznoComponent implements OnInit {

    formInput: {
        naziv: string,
        trajanje: string,
        cena: string,
        specijalizacija: string
    }
    errorMessage: string;

    constructor(private lekarService: LekarService) { }

    ngOnInit(): void {
        this.formInput = {cena: '', trajanje: '', naziv: '', specijalizacija: ''};
        this.errorMessage = '';
    }

    dodajNoviPregled(pregledForm) {
        if (pregledForm.invalid) {
            this.errorMessage = 'Error';
            return;
        }

        this.lekarService.addNoviPregled(this.formInput).subscribe((message) => {
            this.errorMessage = message['message'];
        });
    }

}
