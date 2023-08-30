import { Component, OnInit } from '@angular/core';
import { LekarService } from '../../../services/lekar/lekar.service';
import Lekar from 'src/app/models/lekar.model';

@Component({
  selector: 'app-razno',
  templateUrl: './razno.component.html',
  styleUrls: ['./razno.component.css']
})
export class RaznoComponent implements OnInit {

    lekar: Lekar;
    formInput: {
        naziv: string,
        trajanje: number,
        cena: number,
        specijalizacija: string
    }
    errorMessage: string;

    constructor(private lekarService: LekarService) { }

    ngOnInit(): void {
        this.lekarService.getLekarById(localStorage.getItem('_id')).subscribe((lekar: Lekar) => {
            this.lekar = lekar;
            this.formInput = {cena: 0, trajanje: 0, naziv: '', specijalizacija: this.lekar.specijalizacija};
            this.errorMessage = '';
        });
    }

    addNewPregled(pregledForm) {
        if (pregledForm.invalid) {
            this.errorMessage = 'Error: popunite polja validnim vrednostima.';
            return;
        }
        if (this.formInput.cena == null || this.formInput.trajanje == null) {
            this.errorMessage = 'Error: popunite polja validnim vrednostima.';
            return;
        }
        if (this.formInput.cena < 0 || this.formInput.trajanje <= 0) {
            this.errorMessage = 'Error: popunite polja validnim vrednostima.';
            return;
        }

        this.lekarService.addNewPregled(this.formInput).subscribe((message) => {
            this.errorMessage = message['message'];
        });
    }

}
