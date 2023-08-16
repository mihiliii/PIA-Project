import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { MenadzerService } from 'src/app/services/menadzer/menadzer.service';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

    user: any;
    userType: string;
    showComponent: boolean;
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
    // selectedImageFormInput: File;
    // selectedImageURL: string;

    constructor(private menadzerService: MenadzerService, private authenticationService: AuthenticationService, private router: Router) {
    }

    ngOnInit(): void {
    }

    populateUserEditComponent(user, userType, showComponent) {
        this.user = user;
        this.userType = userType;
        this.showComponent = showComponent;
        if (this.userType == 'pacijent') {
            this.formInput = {
                korisnickoIme: this.user.korisnickoIme,
                lozinka: this.user.lozinka,
                ime: this.user.ime,
                prezime: this.user.prezime,
                adresa: this.user.adresa,
                kontaktTelefon: this.user.kontaktTelefon,
                email: this.user.email,
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
        
        let pacijent = {
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

        this.menadzerService.updateUser(pacijent).subscribe((response) => {
            
            console.log(response['message']);
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
