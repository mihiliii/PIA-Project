import { Component, OnInit } from '@angular/core';
import { PacijentService } from '../../../services/pacijent/pacijent.service';
import ZakazaniPregled from 'src/app/models/zakazaniPregled.model';
import Izvestaj from 'src/app/models/izvestaj.model';

@Component({
    selector: 'app-pacijent-pregledi',
    templateUrl: './pacijent-pregledi.component.html',
    styleUrls: ['./pacijent-pregledi.component.css']
})
export class PacijentPreglediComponent implements OnInit {

    zakazaniPreglediList: ZakazaniPregled[];
    izvestajList: Izvestaj[];

    constructor(private pacijentService: PacijentService) { }

    ngOnInit(): void {
        this.populatePacijentPreglediComponent();
    }

    populatePacijentPreglediComponent() {
        this.pacijentService.getZakazaniPreglediListByPacijentId(localStorage.getItem('_id')).subscribe((zakazaniPreglediList: any) => {
            this.zakazaniPreglediList = zakazaniPreglediList;

            this.zakazaniPreglediList = this.zakazaniPreglediList.sort((pregled1, pregled2) => {
                if (pregled1.datum == pregled2.datum) {
                    return pregled1.vreme > pregled2.vreme ? 1 : -1;
                }
                else {
                    return pregled1.datum > pregled2.datum ? 1 : -1;
                }
            });
            
        });

        this.pacijentService.getIzvestajListByPacijentId(localStorage.getItem('_id')).subscribe((izvestajList: any) => {
            this.izvestajList = izvestajList;

            console.log(this.izvestajList);
            this.izvestajList = this.izvestajList.sort((izvestaj1, izvestaj2) => {
                if (izvestaj1.datum == izvestaj2.datum) {
                    return izvestaj1.vreme > izvestaj2.vreme ? 1 : -1;
                }
                else {
                    return izvestaj1.datum > izvestaj2.datum ? 1 : -1;
                }
            });
        });
    }

    deleteZakazaniPregled(pregledId) {
        this.pacijentService.deleteZakazaniPregled(pregledId).subscribe((returnData) => {
            if (returnData['message'] == 'success') {
                console.log('Otkazivanje zakazanog pregleda uspesno');
            }
            this.ngOnInit();
        });
    }

}
