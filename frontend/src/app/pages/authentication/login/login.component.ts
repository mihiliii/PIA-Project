import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username: string;
    password: string;
    userType: string;
    errorMessage: string;

    constructor(private authenticationService: AuthenticationService, private router: Router, private activatedRoute: ActivatedRoute) { 

        this.activatedRoute.data.subscribe(data => {
            this.userType = data['userType'];
        });
    }

    ngOnInit(): void {
        this.username = this.password = this.errorMessage = '';
    }

    login() {

        if (this.username == '' || this.password == '') {
            this.errorMessage = 'Error: popunite sva polja';
            return;
        }

        const loginData = {
            korisnickoIme: this.username,
            lozinka: this.password,
            userType: this.userType
        };

        this.authenticationService.login(loginData).subscribe((user: any) => {
            
            if (user == null) {
                this.errorMessage = 'Error: pogresno korisnicko ime ili lozinka';
            }
            else {
                localStorage.setItem('_id', user._id);
                localStorage.setItem('korisnickoIme', user.korisnickoIme);
                localStorage.setItem('userType', user.userType);

                if (user.userType == 'pacijent') {
                    this.router.navigate(['pacijent/profil']);
                }
                else if (user.userType == 'lekar'){
                    this.router.navigate(['lekar/profil']);
                }
                else {
                    this.router.navigate(['menadzer']);
                }
            }
        });
    }

    goToRegister() {
        
        this.router.navigate(['register']);
    }

}
