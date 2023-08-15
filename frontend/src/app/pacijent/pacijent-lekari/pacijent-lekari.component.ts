import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pacijent-lekari',
  templateUrl: './pacijent-lekari.component.html',
  styleUrls: ['./pacijent-lekari.component.css']
})
export class PacijentLekariComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
    }
    
}
