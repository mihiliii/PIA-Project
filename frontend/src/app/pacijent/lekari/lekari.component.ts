import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lekari',
  templateUrl: './lekari.component.html',
  styleUrls: ['./lekari.component.css']
})
export class LekariComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
    }
    
}
