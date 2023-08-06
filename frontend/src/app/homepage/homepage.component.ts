import { Component, OnInit } from '@angular/core';
import Lekar from '../models/lekar.model';
import { HomepageService } from '../services/homepage.service';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

    lekarArray: Lekar[];

    constructor(private homepageService: HomepageService) { }

    ngOnInit(): void {
        this.homepageService.getAllLekari().subscribe((lekari: Lekar[]) => {
            this.lekarArray = lekari;
        });
    }


}
