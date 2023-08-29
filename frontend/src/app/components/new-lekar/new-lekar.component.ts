import { Component, OnInit } from '@angular/core';
import { MenadzerService } from '../../services/menadzer/menadzer.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-new-lekar',
  templateUrl: './new-lekar.component.html',
  styleUrls: ['./new-lekar.component.css']
})
export class NewLekarComponent implements OnInit {

    formInput: {
        korisnickoIme: string;
        lozinka: string;
        ponovljenaLozinka: string;
        ime: string;
        prezime: string;
        adresa: string;
        kontaktTelefon: string;
        email: string;
        brojLicence: string;
        specijalizacija: string;
        ogranakOrdinacije: string;
    };
    showComponent = false;
    selectedImageFormInput: File;
    selectedImageURL: string;
    errorArray: string[];

    constructor(private menadzerService: MenadzerService, private authenticationService: AuthenticationService) { }

    ngOnInit(): void {
    }

    populateNewLekarComponent() {
        this.showComponent = true;
        this.selectedImageFormInput = null;
        this.selectedImageURL = null;
        this.formInput = {
            korisnickoIme: '',
            lozinka: '',
            ponovljenaLozinka: '',
            ime: '',
            prezime: '',
            adresa: '',
            kontaktTelefon: '',
            email: '',
            brojLicence: '',
            specijalizacija: '',
            ogranakOrdinacije: '',
        }
        this.errorArray = [];
    }

    addNewLekar(form) {

        this.errorArray = [];
        let regex = /^(?!.*(.)\1)(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!_])[A-Za-z].{7,13}$/;

        if (form.invalid){
            console.log('1');
            this.errorArray.push('Error: popunite sva polja prilikom registracije.');
        }
        if (this.formInput.lozinka != this.formInput.ponovljenaLozinka) {
            this.errorArray.push('Error: lozinke moraju da se podudaraju.');
        }
        if (!this.formInput.lozinka.match(regex)) {
            this.errorArray.push('Error: lozinka ne ispunjava navedeni uslov.');
        }
        if (this.errorArray.length != 0) {
            return;
        }
        
        let lekar = {
            korisnickoIme: this.formInput.korisnickoIme,
            lozinka: this.formInput.lozinka,
            ime: this.formInput.ime,
            prezime: this.formInput.prezime,
            adresa: this.formInput.adresa,
            kontaktTelefon: this.formInput.kontaktTelefon,
            email: this.formInput.email,
            brojLicence: this.formInput.brojLicence,
            specijalizacija: this.formInput.specijalizacija,
            ogranakOrdinacije: this.formInput.ogranakOrdinacije
        }

        this.menadzerService.addNewLekar(lekar).subscribe((response) => {
            
            if (response['message'] == 'success') {

                if (this.selectedImageFormInput !== null) {
                    let formData = new FormData();
                    formData.set('korisnickoIme', lekar.korisnickoIme);
                    formData.set('type', 'lekar');
                    formData.append('image', this.selectedImageFormInput);

                    this.authenticationService.uploadImage(formData).subscribe((response) => {

                    });
                }
                this.discardForm();                
            }
            else {
                this.errorArray.push(response['message']);
            }
        });

    }

    discardForm() {
        this.formInput = undefined;
        this.showComponent = false;
        this.selectedImageFormInput = null;
        this.selectedImageURL = null;
        this.errorArray = [];
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
