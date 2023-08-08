import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Pacijent from 'src/app/models/pacijent.model';
import { PacijentService } from '../services/pacijent.service';

@Component({
    selector: 'app-profil',
    templateUrl: './profil.component.html',
    styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

    pacijent: Pacijent;
    imageUrl: string;

    constructor(private pacijentService: PacijentService, private router: Router) { }

    ngOnInit(): void {
        this.getPacijent();
    }

    getPacijent() {
        this.pacijentService.getPacijent('mika').subscribe((pacijent: Pacijent) => {
            this.pacijent = pacijent;
            this.imageUrl = 'http://localhost:4000/images/' + this.pacijent.image; 
        });
    }

    isLoggedIn() {
        if (localStorage.length === 0) return false;
        return true;
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['']);
    }

}
