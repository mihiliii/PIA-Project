import { Component, OnInit, ViewChild } from '@angular/core';
import Pacijent from '../models/pacijent.model';
import Lekar from '../models/lekar.model';
import { MenadzerService } from '../services/menadzer/menadzer.service';
import { PacijentService } from '../services/pacijent/pacijent.service';
import { UserEditComponent } from '../display-components/user-edit/user-edit.component';

@Component({
  selector: 'app-menadzer',
  templateUrl: './menadzer.component.html',
  styleUrls: ['./menadzer.component.css']
})
export class MenadzerComponent implements OnInit {

    registerRequestsList: Pacijent[];
    pacijentList: Pacijent[];
    @ViewChild(UserEditComponent) userEditComponent: UserEditComponent;

    constructor(private menadzerService: MenadzerService, private pacijentService: PacijentService) {}

    ngOnInit(): void {
        this.populateMenadzerComponent();
    }

    populateMenadzerComponent() {

        this.menadzerService.getRegisterRequests().subscribe((responseData: Pacijent[]) => {

            this.registerRequestsList = responseData.map(pacijent => {
                pacijent['checkbox'] = false;
                return pacijent;
            });
        });

        this.pacijentService.getAllPacijenti().subscribe((responseData: Pacijent[]) => {
            this.pacijentList = responseData;
        });
    }

    acceptRegisterRequests() {
        let acceptedRequests = {
            pacijentList: []
        }

        for (let pacijent of this.registerRequestsList) {
            if (pacijent['checkbox'])
                acceptedRequests.pacijentList.push(pacijent);
        }
        
        this.menadzerService.acceptRegisterRequests(acceptedRequests).subscribe((message) => {
            console.log(message);
            this.ngOnInit();
        });
    }

    declineRegisterRequests() {
        let declinedRequests = {
            pacijentList: []
        }

        for (let pacijent of this.registerRequestsList) {
            if (pacijent['checkbox'])
                declinedRequests.pacijentList.push(pacijent);
        }

        this.menadzerService.declineRegisterRequests(declinedRequests).subscribe((message) => {
            console.log(message);
            this.ngOnInit();
        });
    }

    deleteUser(userId, userType: string) {
        const requestData = {
            _id: userId,
            userType: userType
        };

        this.menadzerService.deleteUser(requestData).subscribe((responseData) => {
            console.log(responseData['message']);
            this.ngOnInit();
        });
    }

    openUserEditComponent(userToEdit, userTypeToEdit: string) {
        this.userEditComponent.populateUserEditComponent(userToEdit, userTypeToEdit, true);
    }

}
