import { Component, OnInit } from '@angular/core';
import { PacijentService } from '../../../services/pacijent/pacijent.service';
import ZakazaniPregled from 'src/app/models/zakazaniPregled.model';

@Component({
    selector: 'app-pacijent-pregledi',
    templateUrl: './pacijent-pregledi.component.html',
    styleUrls: ['./pacijent-pregledi.component.css']
})
export class PacijentPreglediComponent implements OnInit {

    zakazaniPreglediList: ZakazaniPregled[];

    constructor(private pacijentService: PacijentService) { }

    ngOnInit(): void {
        this.populatePacijentPreglediComponent();
    }

    populatePacijentPreglediComponent() {
        this.pacijentService.getZakazaniPreglediListByPacijentId(localStorage.getItem('_id')).subscribe((zakazaniPreglediList: any) => {
            this.zakazaniPreglediList = zakazaniPreglediList;

            this.zakazaniPreglediList.sort((pregled1, pregled2) => {
                if (pregled1.datum == pregled2.datum) {
                    return pregled1.vreme > pregled2.vreme ? 1 : -1;
                }
                else {
                    return pregled1.datum > pregled2.datum ? 1 : -1;
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
