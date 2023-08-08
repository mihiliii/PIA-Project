import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Pacijent from 'src/app/models/pacijent.model';
import { PacijentService } from 'src/app/services/pacijent.service';

@Component({
    selector: 'app-profil',
    templateUrl: './profil.component.html',
    styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

    pacijent: Pacijent;

    constructor(private pacijentService: PacijentService, private router: Router) { }

    ngOnInit(): void {
        this.getPacijent();
    }

    getPacijent() {
        this.pacijentService.getPacijent('mika').subscribe((pacijent: Pacijent) => {
            this.pacijent = pacijent;
        });
        console.log(this.pacijent);
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['']);
    }

}
