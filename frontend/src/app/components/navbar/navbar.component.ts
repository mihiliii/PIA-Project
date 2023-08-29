import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    _id: string;
    userType: string;

    constructor(protected router: Router) { }

    ngOnInit(): void {
        this._id = localStorage.getItem('_id');
        this.userType = localStorage.getItem('userType');
    }

    goToLogin() {
        this.router.navigate(['login']);
    }

    isLoggedIn() {
        if (localStorage.length === 0) return false;
        return true;
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['']);
        this.ngOnInit();
    }

}
