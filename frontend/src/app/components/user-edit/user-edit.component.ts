import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import Pacijent from 'src/app/models/pacijent.model';
import Lekar from 'src/app/models/lekar.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { MenadzerService } from 'src/app/services/menadzer/menadzer.service';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

    user: Pacijent | Lekar;
    userType: string;
    formInput: {
        korisnickoIme: string;
        ime: string;
        prezime: string;
        adresa: string;
        kontaktTelefon: string;
        email: string;
        // image: string;
    };
    lekarFormInput: {
        brojLicence: string;
        specijalizacija: string;
    }
    showComponent = false;
    errorArray: string[];
    @Output() parentNgOnInit: EventEmitter<any> = new EventEmitter();
    selectedImageFormInput: File;
    selectedImageURL: string;

    constructor(private menadzerService: MenadzerService, private authenticationService: AuthenticationService, private router: Router) {
    }

    ngOnInit(): void {
    }

    populateUserEditComponent(user, userType) {
        this.user = user;
        this.userType = userType;
        this.showComponent = true;
        this.errorArray = [];
        this.formInput = {
            korisnickoIme: this.user.korisnickoIme,
            ime: this.user.ime,
            prezime: this.user.prezime,
            adresa: this.user.adresa,
            kontaktTelefon: this.user.kontaktTelefon,
            email: this.user.email,
        }
        if (this.userType == 'lekar') {
            let user = this.user as Lekar;
            this.lekarFormInput = {
                brojLicence: user.brojLicence,
                specijalizacija: user.specijalizacija
            }
        }
        this.selectedImageFormInput = null;
        this.selectedImageURL = '';
    }

    saveChanges(form) {

        if (form.invalid){
            console.log('form Invalid');
            return;
        }

        let user;
        
        if (this.userType == 'pacijent') {
            user = {
                userType: 'pacijent',
                _id: this.user._id,
                korisnickoIme: this.formInput.korisnickoIme,
                ime: this.formInput.ime,
                prezime: this.formInput.prezime,
                adresa: this.formInput.adresa,
                kontaktTelefon: this.formInput.kontaktTelefon,
                email: this.formInput.email,
                oldKorisnickoIme: this.user.korisnickoIme,
                oldEmail: this.user.email
            }
        }
        else {
            user = {
                userType: 'lekar',
                _id: this.user._id,
                korisnickoIme: this.formInput.korisnickoIme,
                ime: this.formInput.ime,
                prezime: this.formInput.prezime,
                adresa: this.formInput.adresa,
                kontaktTelefon: this.formInput.kontaktTelefon,
                brojLicence: this.lekarFormInput.brojLicence,
                specijalizacija: this.lekarFormInput.specijalizacija,
                oldKorisnickoIme: this.user.korisnickoIme,
                oldEmail: this.user.email
            }
        }

        this.menadzerService.updateUser(user).subscribe((response) => {
            if (response['message'] != 'success') {
                this.errorArray.push(response['message']);
            }
            else {
                console.log(this.selectedImageFormInput);
                if (this.selectedImageFormInput !== null) {
                    let formData = new FormData();
                    formData.set('korisnickoIme', this.user.korisnickoIme);
                    formData.set('type', this.userType);
                    formData.append('image', this.selectedImageFormInput);

                    this.authenticationService.uploadImage(formData).subscribe((response) => {});
                }
                this.discardChanges();
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

    discardChanges() {
        this.user = null;
        this.userType = null;
        this.showComponent = false;
        this.parentNgOnInit.emit({showUserEdit: false});
    }

}
