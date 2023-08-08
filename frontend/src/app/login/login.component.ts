import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Pacijent from '../models/pacijent.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username: string;
    password: string;
    userType: string;

    constructor(private loginService: LoginService, private router: Router, private activatedRoute: ActivatedRoute) { 
        this.activatedRoute.data.subscribe(data => {
            this.userType = data['userType'];
        });
    }

    ngOnInit(): void {
    }

    login() {
        this.loginService.login(this.username, this.password, this.userType).subscribe((korisnik: any) => {
            if (korisnik != null) {
                console.log('Uspesna prijava: ' + korisnik.korisnickoIme + ' ' + korisnik.lozinka);
                localStorage.setItem('korisnickoIme', korisnik.korisnickoIme);
                localStorage.setItem('userType', korisnik.userType);
                this.router.navigate(['register']);
            }
        });
    }

    goToRegister() {
        this.router.navigate(['register']);
    }

}