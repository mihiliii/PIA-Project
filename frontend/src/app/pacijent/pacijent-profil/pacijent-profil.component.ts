import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Pacijent from 'src/app/models/pacijent.model';
import { PacijentService } from '../../services/pacijent/pacijent.service';

@Component({
    selector: 'app-pacijent-profil',
    templateUrl: './pacijent-profil.component.html',
    styleUrls: ['./pacijent-profil.component.css']
})
export class PacijentProfilComponent implements OnInit {

    pacijentInfo: Pacijent;

    constructor(private pacijentService: PacijentService, private router: Router) { }

    ngOnInit(): void {
        this.populatePacijentProfilComponent();
    }

    populatePacijentProfilComponent() {
        this.pacijentService.getPacijentById(localStorage.getItem('_id')).subscribe((pacijent: Pacijent) => {
            this.pacijentInfo = pacijent;
        });
    }

}
