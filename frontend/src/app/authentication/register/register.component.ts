import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { RegisterInterface } from '../../models/register.interface';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerInterface: RegisterInterface;
    selectedImage: File;
    selectedImageURL: string;
    errorArray: string[];

    constructor(private authenticationSerivce: AuthenticationService, private router: Router) {
    }

    ngOnInit(): void {
        this.registerInterface = new RegisterInterface();
        this.selectedImage = null;
        this.selectedImageURL = '';
        this.errorArray = [];
    }

    register(form: NgForm) {
        
        if (form.invalid || this.registerInterface.lozinka != this.registerInterface.ponovljenaLozinka)
            return;
        
        let pacijent = {
            korisnickoIme: this.registerInterface.korisnickoIme,
            lozinka: this.registerInterface.lozinka,
            ime: this.registerInterface.ime,
            prezime: this.registerInterface.prezime,
            adresa: this.registerInterface.adresa,
            kontaktTelefon: this.registerInterface.kontaktTelefon,
            email: this.registerInterface.email
        }

        this.authenticationSerivce.registerPacijent(pacijent).subscribe((response) => {
            
            console.log(response['message']);
            if (response['message'] == 'pacijent register success!') {
                if (this.selectedImage !== null) {
                    let formData = new FormData();
                    formData.set('korisnickoIme', pacijent.korisnickoIme);
                    formData.set('type', 'pacijent');
                    formData.append('image', this.selectedImage);

                    this.authenticationSerivce.uploadImage(formData).subscribe((message) => {
                        console.log(message['message']);
                    });
                }

                this.router.navigate(['']);
            }
            else {
                this.errorArray.push(response['message']);
            }
        });

    }

    fileInput(event: any) {
        this.selectedImage = event.target.files[0];

        const reader = new FileReader();
        reader.onload = (event: any) => {
            this.selectedImageURL = event.target.result;
        };
        reader.readAsDataURL(this.selectedImage);
    }

}
