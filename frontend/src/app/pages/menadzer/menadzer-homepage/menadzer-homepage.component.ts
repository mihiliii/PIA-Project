import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import Pacijent from '../../../models/pacijent.model';
import Lekar from '../../../models/lekar.model';
import { MenadzerService } from '../../../services/menadzer/menadzer.service';
import { PacijentService } from '../../../services/pacijent/pacijent.service';
import { UserEditComponent } from '../../../components/user-edit/user-edit.component';
import { LekarService } from '../../../services/lekar/lekar.service';
import { NewLekarComponent } from '../../../components/new-lekar/new-lekar.component';
import Pregled from '../../../models/pregled.model';
import { PregledEditComponent } from 'src/app/components/pregled-edit/pregled-edit.component';

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
    showUserEdit: boolean;
    showNewLekar: boolean;
    showPregledEdit: boolean;
    imeSpecijalizacijeInput: string;
    errorSpecijalizacija: string;
    acceptedPregledList: Pregled[];
    @ViewChild(UserEditComponent) userEditComponent: UserEditComponent;
    @ViewChild(NewLekarComponent) newLekarComponent: NewLekarComponent;
    @ViewChild(PregledEditComponent) pregledEditComponent: PregledEditComponent;

    constructor(private menadzerService: MenadzerService, private pacijentService: PacijentService, private lekarService: LekarService) {}

    ngOnInit(): void {
        this.populateMenadzerComponent(null);
    }

    populateMenadzerComponent(event: any) {

        this.showNewLekar = false;
        this.showUserEdit = false;
        this.showPregledEdit = false;
        this.imeSpecijalizacijeInput = '';
        this.errorSpecijalizacija = '';

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

            this.acceptedPregledList = responseData.filter((pregled) => {
                return pregled.status == 'aktivan';
            });
            
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

        this.menadzerService.deleteUser(requestData).subscribe((responseData) => {
            console.log(responseData['message']);
            this.ngOnInit();
        });
    }

    openUserEditComponent(userToEdit, userTypeToEdit) {
        this.showUserEdit = true;
        this.showNewLekar = false;
        this.showPregledEdit = false;
        this.userEditComponent.populateUserEditComponent(userToEdit, userTypeToEdit);
    }

    openNewLekarComponent() {
        this.showNewLekar = true;
        this.showUserEdit = false;
        this.showPregledEdit = false;
        this.newLekarComponent.populateNewLekarComponent();
    }

    openPregledEditComponent(pregled) {
        this.showPregledEdit = true;
        this.showNewLekar = false;
        this.showUserEdit = false;
        this.pregledEditComponent.populatePregledEditComponent(pregled);
    }

    acceptPregledi() {
        let array = this.pregledList.filter((pregled) => {
            return pregled['checkbox'];
        });

        const data = {
            array: array
        }
        
        this.menadzerService.acceptPregledi(data).subscribe((response) => {
            console.log(response['message']);
            this.ngOnInit();
        });
    }

    declinePregledi() {
        let array = this.pregledList.filter((pregled) => {
            return pregled['checkbox'];
        });

        const data = {
            array: array
        }
        
        this.menadzerService.declinePregledi(data).subscribe((response) => {
            console.log(response['message']);
            this.ngOnInit();
        });
    }

    addNewSpecijalizacija(form) {
        if (this.imeSpecijalizacijeInput == '') {
            this.errorSpecijalizacija = 'Error: unesite ime specijalizacije';
            return;
        }

        const data = {
            naziv: this.imeSpecijalizacijeInput
        }

        this.menadzerService.addNewSpecijalizacija(data).subscribe((response) => {
            console.log(response['message']);
            this.ngOnInit();
        });
    }

    deletePregled(pregled) {
        let array = [pregled];

        const data = {
            array: array
        }

        this.menadzerService.declinePregledi(data).subscribe((response) => {
            console.log(response['message']);
            this.ngOnInit();
        });
    }

}
