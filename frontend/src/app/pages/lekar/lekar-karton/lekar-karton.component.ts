import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Izvestaj from 'src/app/models/izvestaj.model';
import { LekarService } from 'src/app/services/lekar/lekar.service';

@Component({
    selector: 'app-lekar-karton',
    templateUrl: './lekar-karton.component.html',
    styleUrls: ['./lekar-karton.component.css']
})
export class LekarKartonComponent implements OnInit {

    izvestajList: Izvestaj[];

    constructor(private lekarService: LekarService, private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.getAllIzvestajiForPacijent();
    }

    getAllIzvestajiForPacijent() {
        
        const data = {
            lekar: localStorage.getItem('_id'),
            pacijent: this.activatedRoute.snapshot.paramMap.get('_id')
        }

        this.lekarService.getAllIzvestaji(data).subscribe((izvestaji: any) => {
            this.izvestajList = izvestaji;
        }) 
    }

}
