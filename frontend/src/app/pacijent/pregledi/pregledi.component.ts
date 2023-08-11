import { Component, OnInit } from '@angular/core';
import { PacijentService } from '../services/pacijent.service';
import ZakazaniPregled from 'src/app/models/zakazano.model';

@Component({
    selector: 'app-pregledi',
    templateUrl: './pregledi.component.html',
    styleUrls: ['./pregledi.component.css']
})
export class PreglediComponent implements OnInit {

    pregledArray: ZakazaniPregled[];

    constructor(private pacijentService: PacijentService) { }

    ngOnInit(): void {
        this.getPregledi();
    }

    getPregledi() {
        this.pacijentService.getPregledi(localStorage.getItem('_id')).subscribe((zakazaniPregledi: any) => {
            this.pregledArray = zakazaniPregledi;

            this.pregledArray.sort((pregled1, pregled2) => {
                if (pregled1.datum == pregled2.datum) {
                    return pregled1.vreme > pregled2.vreme ? 1 : -1;
                }
                else {
                    return pregled1.datum > pregled2.datum ? 1 : -1;
                }
            });

        });
    }

    cancelPregled(id) {
        this.pacijentService.cancelPregled(id).subscribe((returnData) => {
            if (returnData['message'] == 'brisanje uspesno') {
                console.log('ok');
            }
            this.ngOnInit();
        });
    }

}
