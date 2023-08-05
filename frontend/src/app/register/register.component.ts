import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { RegisterInterface } from '../models/register.interface';
import Pacijent from '../models/pacijent.model';
import Lekar from '../models/lekar.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerInterface: RegisterInterface;
    radioButton: string;
    selectedImage: File;
    selectedImageURL: string;
    errorArray: string[];

    constructor(private registerService: RegisterService, private router: Router) {
    }

    ngOnInit(): void {
        this.radioButton = 'radioPacijent';
        this.registerInterface = new RegisterInterface();
        this.selectedImage = null;
        this.selectedImageURL = '';
        this.errorArray = [];
    }

    register(form: NgForm) {
        if (form.invalid || this.registerInterface.lozinka != this.registerInterface.ponovljenaLozinka)
            return;
        
        if (this.radioButton == "radioPacijent") {
            let pacijent = {
                korisnickoIme: this.registerInterface.korisnickoIme,
                lozinka: this.registerInterface.lozinka,
                ime: this.registerInterface.ime,
                prezime: this.registerInterface.prezime,
                adresa: this.registerInterface.adresa,
                kontaktTelefon: this.registerInterface.kontaktTelefon,
                email: this.registerInterface.email
            }

            this.registerService.registerPacijent(pacijent).subscribe((response) => {
                console.log(response['message'])
                if (response['message'] == 'pacijent register success!') {
                    if (this.selectedImage !== null) {
                        let formData = new FormData();
                        formData.set('korisnickoIme', pacijent.korisnickoIme);
                        formData.set('type', 'pacijent');
                        formData.append('image', this.selectedImage);

                        this.registerService.uploadImage(formData).subscribe((message) => {
                            console.log(message['message']);
                        });
                    }

                    this.router.navigate(['']);
                }
                else {
                    this.errorArray.push(response['message']);
                    console.log(this.errorArray.length);
                }
            });

        }
        else if (this.radioButton == "radioLekar") {
            let lekar = {
                korisnickoIme: this.registerInterface.korisnickoIme,
                lozinka: this.registerInterface.lozinka,
                ime: this.registerInterface.ime,
                prezime: this.registerInterface.prezime,
                adresa: this.registerInterface.adresa,
                kontaktTelefon: this.registerInterface.kontaktTelefon,
                email: this.registerInterface.email,
                brojLicence: this.registerInterface.brojLicence,
                specijalizacija: this.registerInterface.specijalizacija,
                ogranakOrdinacije: this.registerInterface.ogranakOrdinacije
            }

            this.registerService.registerLekar(lekar).subscribe((response) => {
                console.log(response['message'])
                if (response['message'] == 'lekar register success!') {
                    this.router.navigate(['']);
                }
                else {
                    this.errorArray.push(response['message']);
                    console.log(this.errorArray.length);
                }
            });
        }
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
