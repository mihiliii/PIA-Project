import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import Pacijent from '../models/pacijent.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username: string;
    password: string;

    constructor(private loginService: LoginService, private router: Router) { }

    ngOnInit(): void {
    }

    login() {
        this.loginService.login(this.username, this.password).subscribe((pacijent: Pacijent) => {
            if (pacijent != null) {
                console.log('Uspesna prijava: ' + pacijent.korisnickoIme + ' ' + pacijent.lozinka);
            }
        });
    }

    goToRegister() {
        this.router.navigate(['register']);
    }

}
