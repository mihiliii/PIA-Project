import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username: string;
    password: string;
    userType: string;
    error: string;

    constructor(private authenticationService: AuthenticationService, private router: Router, private activatedRoute: ActivatedRoute) { 

        this.activatedRoute.data.subscribe(data => {
            this.userType = data['userType'];
        });
    }

    ngOnInit(): void {
        this.username = this.password = this.error = '';
    }

    login() {

        if (this.username == '' || this.password == '') {
            this.error = 'Error: popunite sva polja';
            return;
        }

        const loginData = {
            korisnickoIme: this.username,
            lozinka: this.password,
            userType: this.userType
        };

        this.authenticationService.login(loginData).subscribe((korisnik: any) => {
            if (korisnik == null) {
                this.error = 'Error: pogresno korisnicko ime ili lozinka';
            }
            else {
                localStorage.setItem('_id', korisnik._id);
                localStorage.setItem('korisnickoIme', korisnik.korisnickoIme);
                localStorage.setItem('userType', korisnik.userType);
                if (korisnik.userType == 'pacijent') {
                    this.router.navigate(['pacijent/profil']);
                }
                else {
                    //fali za lekara i menadzera
                    this.router.navigate(['']);
                }
            }
        });
    }

    goToRegister() {
        
        this.router.navigate(['register']);
    }

}
