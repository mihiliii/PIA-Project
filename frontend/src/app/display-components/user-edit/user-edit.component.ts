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
        lozinka: string;
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
        ogranakOrdinacije: string;
    }
    showComponent = false;
    @Output() parentNgOnInit: EventEmitter<any> = new EventEmitter();
    // selectedImageFormInput: File;
    // selectedImageURL: string;

    constructor(private menadzerService: MenadzerService, private authenticationService: AuthenticationService, private router: Router) {
    }

    ngOnInit(): void {
    }

    populateUserEditComponent(user, userType) {
        this.user = user;
        this.userType = userType;
        this.showComponent = true;
        this.formInput = {
            korisnickoIme: this.user.korisnickoIme,
            lozinka: this.user.lozinka,
            ime: this.user.ime,
            prezime: this.user.prezime,
            adresa: this.user.adresa,
            kontaktTelefon: this.user.kontaktTelefon,
            email: this.user.email,
        }
        if (this.userType = 'lekar') {
            let user = this.user as Lekar;
            this.lekarFormInput = {
                brojLicence: user.brojLicence,
                specijalizacija: user.specijalizacija,
                ogranakOrdinacije: user.ogranakOrdinacije
            }
        }
        // this.selectedImageFormInput = null;
        // this.selectedImageURL = '';
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
                lozinka: this.formInput.lozinka,
                ime: this.formInput.ime,
                prezime: this.formInput.prezime,
                adresa: this.formInput.adresa,
                kontaktTelefon: this.formInput.kontaktTelefon,
                email: this.formInput.email
            }
        }
        else {
            user = {
                userType: 'lekar',
                _id: this.user._id,
                korisnickoIme: this.formInput.korisnickoIme,
                lozinka: this.formInput.lozinka,
                ime: this.formInput.ime,
                prezime: this.formInput.prezime,
                adresa: this.formInput.adresa,
                kontaktTelefon: this.formInput.kontaktTelefon,
                email: this.formInput.email,
                brojLicence: this.lekarFormInput.brojLicence,
                specijalizacija: this.lekarFormInput.specijalizacija,
                ogranakOrdinacije: this.lekarFormInput.ogranakOrdinacije
            }
        }

        this.menadzerService.updateUser(user).subscribe((response) => {
            
            console.log(response['message']);
            this.parentNgOnInit.emit({showUserEdit: false});
            this.discardChanges();
            // if (response['message'] == 'success') {
            //     // if (this.selectedImageFormInput !== null) {
            //     //     let formData = new FormData();
            //     //     formData.set('korisnickoIme', pacijent.korisnickoIme);
            //     //     formData.set('type', 'pacijent');
            //     //     formData.append('image', this.selectedImageFormInput);

            //     //     this.authenticationService.uploadImage(formData).subscribe((response) => {});
            //     // }

            // }
            // else {
            //     this.errorArray.push(response['message']);
            // }
        });

    }

    discardChanges() {
        this.user = null;
        this.userType = null;
        this.showComponent = false;
    }

}
