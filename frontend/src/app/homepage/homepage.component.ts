import { Component, OnInit } from '@angular/core';
import Lekar from '../models/lekar.model';
import { HomepageService } from '../services/homepage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    goToLogin() {
        this.router.navigate(['login']);
    }

}
