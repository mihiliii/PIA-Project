import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Pacijent from 'src/app/models/pacijent.model';
import { PacijentService } from '../../../services/pacijent/pacijent.service';
import { UserEditComponent } from 'src/app/components/user-edit/user-edit.component';

@Component({
    selector: 'app-pacijent-profil',
    templateUrl: './pacijent-profil.component.html',
    styleUrls: ['./pacijent-profil.component.css']
})
export class PacijentProfilComponent implements OnInit {

    pacijentInfo: Pacijent;
    showUserEdit: boolean;
    @ViewChild(UserEditComponent) userEditComponent: UserEditComponent;

    constructor(private pacijentService: PacijentService, private router: Router) { }

    ngOnInit(): void {
        this.populatePacijentProfilComponent(null);
    }

    populatePacijentProfilComponent(event: any) {
        console.log('ludnica');
        this.showUserEdit = false;
        this.pacijentService.getPacijentById(localStorage.getItem('_id')).subscribe((pacijent: Pacijent) => {
            this.pacijentInfo = pacijent;
        });
    }

    openUserEditComponent(userToEdit: Pacijent, userTypeToEdit: string) {
        this.showUserEdit = true;
        this.userEditComponent.populateUserEditComponent(userToEdit, userTypeToEdit);
    }

}
