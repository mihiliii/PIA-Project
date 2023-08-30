import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Pregled from 'src/app/models/pregled.model';
import { MenadzerService } from 'src/app/services/menadzer/menadzer.service';

@Component({
    selector: 'app-pregled-edit',
    templateUrl: './pregled-edit.component.html',
    styleUrls: ['./pregled-edit.component.css']
})
export class PregledEditComponent implements OnInit {

    pregled: Pregled;
    formInput: {
        naziv: string;
        trajanje: number;
        cena: number;
        specijalizacija: string;
    };
    showComponent = false;
    specijalizacijaList;
    @Output() parentNgOnInit: EventEmitter<any> = new EventEmitter();

    constructor(private menadzerService: MenadzerService) { }

    ngOnInit(): void {
    }

    populatePregledEditComponent(pregled) {

        this.pregled = pregled;
        this.formInput = {
            naziv: this.pregled.naziv,
            trajanje: this.pregled.trajanje,
            cena: this.pregled.cena,
            specijalizacija: this.pregled.specijalizacija
        }
        this.menadzerService.getAllSpecijalizacija().subscribe((response) => {
            this.specijalizacijaList = response;
        });
        this.showComponent = true;
    }

    updatePregled() {
        const data = {
            _id: this.pregled._id,
            naziv: this.formInput.naziv,
            trajanje: this.formInput.trajanje,
            cena: this.formInput.cena,
            specijalizacija: this.formInput.specijalizacija,
        }

        this.menadzerService.updatePregled(data).subscribe((response) => {
            console.log(response['message']);
            this.discardChanges();
        })
    }

    discardChanges() {
        this.pregled = null;
        this.showComponent = false;
        this.parentNgOnInit.emit({showComponent: false});
    }

}
