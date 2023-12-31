import { Component, OnInit, ViewChild } from '@angular/core';
import Lekar from '../../../models/lekar.model';
import { LekarService } from '../../../services/lekar/lekar.service';
import { ActivatedRoute } from '@angular/router';
import Pregled from '../../../models/pregled.model';
import { Time } from '@angular/common';
import { UserEditComponent } from 'src/app/components/user-edit/user-edit.component';
import { PasswordResetComponent } from 'src/app/components/password-reset/password-reset.component';

@Component({
  selector: 'app-lekar-profil',
  templateUrl: './lekar-profil.component.html',
  styleUrls: ['./lekar-profil.component.css']
})
export class LekarProfilComponent implements OnInit {

    userType: string;
    userId: string;
    idLekara: string;
    lekar: Lekar;
    preglediIsteSpecijalizacije;
    formInput: {
        pregled: Pregled | string,
        datum: Date,
        vreme: Time
    };
    zakaziPregledMessage: string;
    showUserEdit: boolean;
    showPasswordEdit: boolean;
    @ViewChild(UserEditComponent) userEditComponent: UserEditComponent;
    @ViewChild(PasswordResetComponent) passwordResetComponent: PasswordResetComponent;

    constructor(private lekarService: LekarService, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((routeParams) => {
            this.populateLekarProfilComponent(null);
        })
    }

    populateLekarProfilComponent(event: any) {
        this.showPasswordEdit = false;
        this.showUserEdit = false;
        this.lekar = null;
        this.userType = localStorage.getItem('userType');
        this.userId = localStorage.getItem('_id');
        this.idLekara = this.activatedRoute.snapshot.paramMap.get('_id');
        this.formInput = {
            pregled: null,
            datum: null,
            vreme: null
        }

        this.lekarService.getLekarById(this.idLekara).subscribe((lekar: Lekar) => {
            this.lekar = lekar;

            this.lekarService.getPreglediIsteSpecijalizacije(lekar.specijalizacija).subscribe((pregledi: Pregled[]) => {
                pregledi = pregledi.map((pregled: Pregled) => {
                    pregled['checkbox'] = this.lekar.pregledi.some((obj) => {
                        return obj._id == pregled._id;
                    });

                    return pregled;
                });

                this.preglediIsteSpecijalizacije = pregledi;
            });

        });
    }
    
    addNewZakazaniPregledByPacijent() {
        if (this.formInput.pregled == null || this.formInput.datum == null || this.formInput.vreme == null){
            this.zakaziPregledMessage = 'Error: popuniti sva polja!';
            return;
        }

        let trenutniDatum = new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate());
        let trenutnoVreme = new Date().getHours() + ':' + new Date().getMinutes();

        let inputDatum = new Date(this.formInput.datum);
        let inputVreme = this.formInput.vreme.toString();

        console.log(inputDatum, trenutniDatum, trenutnoVreme);

        if (inputDatum < trenutniDatum || (inputDatum == trenutniDatum && inputVreme <= trenutnoVreme)) {
            this.zakaziPregledMessage = 'Error: datum nije validan!';
            return;
        }

        const zakazaniPregled = {
            lekar: this.lekar,
            pacijent: localStorage.getItem('_id'),
            pregled: this.formInput.pregled,
            datum: this.formInput.datum,
            vreme: this.formInput.vreme
        }
        
        this.lekarService.addNewZakazaniPregled(zakazaniPregled).subscribe((response) => {
            this.zakaziPregledMessage = 'Termin je ' + response['message'];
        });
    }

    updateLekarPregled() {
        this.lekarService.updateLekarPregled(this.lekar._id, this.preglediIsteSpecijalizacije).subscribe(() => {
            
        });
    }

    openUserEditComponent(userToEdit: Lekar, userTypeToEdit: string) {
        this.showUserEdit = true;
        this.userEditComponent.populateUserEditComponent(userToEdit, userTypeToEdit);
    }

    openPasswordEdit() {
        this.showPasswordEdit = true;
        this.passwordResetComponent.populatePasswordResetComponent();
    }

}
