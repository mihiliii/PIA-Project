import { Component, OnInit } from '@angular/core';
import Pacijent from '../models/pacijent.model';
import Lekar from '../models/lekar.model';
import { AuthenticationService } from '../authentication/services/authentication.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) {}

  pacijentArray: Pacijent[];
  lekarArray: Lekar[];

  ngOnInit(): void {
    this.getRegisterRequests();
  }

  getRegisterRequests() {
    this.authenticationService.getRegisterRequests().subscribe((responseData: any) => {
        this.pacijentArray = responseData.pacijentArray.map(pacijent => {
            pacijent.checkbox = false;
            return pacijent;
        });
        this.lekarArray = responseData.lekarArray.map(lekar => {
            lekar.checkbox = false;
            return lekar;
        });
    });
}

acceptRegisterRequests() {
    let acceptedRequests = {
        pacijenti: [],
        lekari: []
    }

    for (let pacijent of this.pacijentArray) {
        if (pacijent.checkbox)
            acceptedRequests.pacijenti.push(pacijent);
    }
    for (let lekar of this.lekarArray) {
        if (lekar.checkbox)
            acceptedRequests.lekari.push(lekar);
    }
    
    this.authenticationService.acceptRegisterRequests(acceptedRequests).subscribe((message) => {
        console.log(message);
        this.ngOnInit();
    });
}

declineRegisterRequests() {
    let declinedRequests = {
        pacijenti: [],
        lekari: []
    }

    for (let pacijent of this.pacijentArray) {
        if (pacijent.checkbox)
            declinedRequests.pacijenti.push(pacijent);
    }
    for (let lekar of this.lekarArray) {
        if (lekar.checkbox)
            declinedRequests.lekari.push(lekar);
    }

    this.authenticationService.declineRegisterRequests(declinedRequests).subscribe((message) => {
        console.log(message);
        this.ngOnInit();
    });
}

}
