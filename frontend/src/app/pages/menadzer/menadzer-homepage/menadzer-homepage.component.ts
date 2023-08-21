import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import Pacijent from '../../../models/pacijent.model';
import Lekar from '../../../models/lekar.model';
import { MenadzerService } from '../../../services/menadzer/menadzer.service';
import { PacijentService } from '../../../services/pacijent/pacijent.service';
import { UserEditComponent } from '../../../components/user-edit/user-edit.component';
import { LekarService } from '../../../services/lekar/lekar.service';
import { NewLekarComponent } from '../../../components/new-lekar/new-lekar.component';
import Pregled from '../../../models/pregled.model';

@Component({
  selector: 'app-menadzer-homepage',
  templateUrl: './menadzer-homepage.component.html',
  styleUrls: ['./menadzer-homepage.component.css']
})
export class MenadzerHomepageComponent implements OnInit {

    registerRequestsList: Pacijent[];
    pacijentList: Pacijent[];
    lekarList: Lekar[];
    pregledList: Pregled[];
    @ViewChild(UserEditComponent) userEditComponent: UserEditComponent;
    @ViewChild(NewLekarComponent) newLekarComponent: NewLekarComponent;

    constructor(private menadzerService: MenadzerService, private pacijentService: PacijentService, private lekarService: LekarService) {}

    ngOnInit(): void {
        this.populateMenadzerComponent(null);
    }

    populateMenadzerComponent(event: any) {

        this.menadzerService.getRegisterRequests().subscribe((responseData: Pacijent[]) => {

            this.registerRequestsList = responseData.map(pacijent => {
                pacijent['checkbox'] = false;
                return pacijent;
            });
        });

        this.pacijentService.getAllPacijenti().subscribe((responseData: Pacijent[]) => {
            this.pacijentList = responseData;
        });

        this.lekarService.getAllLekari().subscribe((responseData: Lekar[]) => {
            this.lekarList = responseData;
        });

        this.menadzerService.getAllPregledi().subscribe((responseData: Pregled[]) => {
            
            responseData = responseData.filter((pregled) => {
                return pregled.status == 'neaktivan';
            });

            responseData = responseData.map((pregled) => {
                pregled['checkbox'] = false
                return pregled;
            });

            this.pregledList = responseData;
        })
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

        // this.menadzerService.deleteUser(requestData).subscribe((responseData) => {
        //     console.log(responseData['message']);
        //     this.ngOnInit();
        // });
    }

    openUserEditComponent(userToEdit, userTypeToEdit) {
        this.userEditComponent.populateUserEditComponent(userToEdit, userTypeToEdit);
    }

    openNewLekarComponent() {
        this.newLekarComponent.populateNewLekarComponent();
    }

}
