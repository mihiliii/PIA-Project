import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import Lekar from 'src/app/models/lekar.model';
import Pacijent from 'src/app/models/pacijent.model';
import { MenadzerService } from 'src/app/services/menadzer/menadzer.service';

@Component({
    selector: 'app-password-reset',
    templateUrl: './password-reset.component.html',
    styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
    
    showComponent = false;
    userType: string;
    formInput: {
        oldPass: string;
        newPass: string;
        repeatPass: string;
    };
    errorMessage: string;
    @Output() parentNgOnInit: EventEmitter<any> = new EventEmitter();

    constructor(private menadzerService: MenadzerService, private router: Router) { }

    ngOnInit(): void {
    }

    populatePasswordResetComponent() {
        this.showComponent = true;
        this.errorMessage = '';
        this.formInput = {
            oldPass: '',
            newPass: '',
            repeatPass: ''
        };
    }

    updatePassword(form) {
        this.errorMessage = '';
        let regex = /^(?!.*(.)\1)(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!_])[A-Za-z].{7,13}$/;

        if (form.invalid){
            this.errorMessage = 'Error: popunite sva polja prilikom registracije.';
        }
        if (this.formInput.newPass != this.formInput.repeatPass) {
            this.errorMessage = 'Error: lozinke moraju da se podudaraju.';
        }
        if (!this.formInput.newPass.match(regex)) {
            this.errorMessage = 'Error: lozinka ne ispunjava navedeni uslov.';
        }
        if (this.errorMessage != '') {
            return;
        }

        let user = {
            userType: localStorage.getItem('userType'),
            _id: localStorage.getItem('_id'),
            staraLozinka: this.formInput.oldPass,
            novaLozinka: this.formInput.newPass
        }

        this.menadzerService.updateUserPassword(user).subscribe((response) => {

            if (response['message'] == 'success') {
                this.discardChanges();
                localStorage.clear();
                this.router.navigate(['/login']);
            }
            else {
                console.log(response['message']);
                this.errorMessage = response['message'];
            }
            
        });
        
    }

    discardChanges() {
        this.userType = null;
        this.showComponent = false;
        this.parentNgOnInit.emit({showPasswordEdit: false});
    }

}
