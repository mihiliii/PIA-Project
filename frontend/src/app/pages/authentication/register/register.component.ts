import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerFormInput: {
        korisnickoIme: string;
        lozinka: string;
        ponovljenaLozinka: string;
        ime: string;
        prezime: string;
        adresa: string;
        kontaktTelefon: string;
        email: string;
    }
    selectedImageFormInput: File;
    selectedImageURL: string;
    errorArray: string[];

    constructor(private authenticationService: AuthenticationService, private router: Router) {
    }

    ngOnInit(): void {
        this.registerFormInput = {
            korisnickoIme: '',
            lozinka: '',
            ponovljenaLozinka: '',
            ime: '',
            prezime: '',
            adresa: '',
            kontaktTelefon: '',
            email: '',
        }
        this.selectedImageFormInput = null;
        this.selectedImageURL = '';
        this.errorArray = [];
    }

    register(form: NgForm) {
        this.errorArray = [];
        let regex = /^(?!.*(.)\1)(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!_])[A-Za-z].{7,13}$/;

        if (form.invalid){
            this.errorArray.push('Error: popunite sva polja prilikom registracije.');
        }
        if (this.registerFormInput.lozinka != this.registerFormInput.ponovljenaLozinka) {
            this.errorArray.push('Error: lozinke moraju da se podudaraju.');
        }
        if (!this.registerFormInput.lozinka.match(regex)) {
            this.errorArray.push('Error: lozinka ne ispunjava navedeni uslov.');
        }
        if (this.errorArray.length != 0) {
            return;
        }
        
        let pacijent = {
            korisnickoIme: this.registerFormInput.korisnickoIme,
            lozinka: this.registerFormInput.lozinka,
            ime: this.registerFormInput.ime,
            prezime: this.registerFormInput.prezime,
            adresa: this.registerFormInput.adresa,
            kontaktTelefon: this.registerFormInput.kontaktTelefon,
            email: this.registerFormInput.email
        }

        this.authenticationService.registerPacijent(pacijent).subscribe((response) => {
            
            if (response['message'] == 'success') {

                if (this.selectedImageFormInput !== null) {
                    let formData = new FormData();
                    formData.set('korisnickoIme', pacijent.korisnickoIme);
                    formData.set('type', 'pacijent');
                    formData.append('image', this.selectedImageFormInput);

                    this.authenticationService.uploadImage(formData).subscribe((response) => {});
                }

                this.router.navigate(['login']);
            }
            else {
                this.errorArray.push(response['message']);
            }
        });

    }

    fileInput(event: any) {
        this.selectedImageFormInput = event.target.files[0];

        const reader = new FileReader();
        reader.onload = (event: any) => {
            this.selectedImageURL = event.target.result;

            let image = new Image();
            image.src = this.selectedImageURL;

            image.onload = () => {
                if (image.height < 100 || image.width < 100 || image.height > 300 || image.width > 300) {
                    this.errorArray.push('Error: slika mora imati dimenzije izmedju 100x100 i 300x300');
                    this.selectedImageFormInput = null;
                    this.selectedImageURL = '';
                }
                else {
                    this.errorArray = this.errorArray.filter((error) => {
                        error != 'Error: slika mora imati dimenzije izmedju 100x100 i 300x300';
                    });
                }
            };
        };
        reader.readAsDataURL(this.selectedImageFormInput);
    }

}
