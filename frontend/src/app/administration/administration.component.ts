import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import Pacijent from '../models/pacijent.model';
import Lekar from '../models/lekar.model';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  constructor(private registerService: RegisterService) {}

  pacijentArray: Pacijent[];
  lekarArray: Lekar[];

  ngOnInit(): void {
    this.getRegisterRequests();
  }

  getRegisterRequests() {
    this.registerService.getRegisterRequests().subscribe((responseData: any) => {
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
    this.registerService.acceptRegisterRequests(acceptedRequests).subscribe((message) => {
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
    this.registerService.declineRegisterRequests(declinedRequests).subscribe((message) => {
        console.log(message);
        this.ngOnInit();
    });
}

}
