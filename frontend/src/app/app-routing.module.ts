import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AdministrationComponent } from './administration/administration.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PacijentProfilComponent } from './pacijent/pacijent-profil/pacijent-profil.component';
import { LekariComponent } from './pacijent/lekari/lekari.component';
import { LekarProfilComponent } from './lekar/profil/lekar-profil.component';
import { PreglediComponent } from './pacijent/pregledi/pregledi.component';
import { LekarPreglediComponent } from './lekar/lekar-pregledi/lekar-pregledi.component';
import { RaznoComponent } from './lekar/razno/razno.component';

const routes: Routes = [
    {path: "", title:'Glavna', component: HomepageComponent},
    {path: "login", component: LoginComponent, data: {userType: ''}},
    {path: "register", component: RegisterComponent},
    {path: "administration", component: AdministrationComponent},
    {path: "login/menadzer", component: LoginComponent, data: {userType: 'menadzer'}},
    {path: "pacijent/profil", component: PacijentProfilComponent},
    {path: "pacijent/lekari", component: LekariComponent},
    {path: "pacijent/pregledi", component: PreglediComponent},
    {path: "lekar/profil", component:LekarProfilComponent},
    {path: "lekar/pregledi", component: LekarPreglediComponent},
    {path: "lekar/razno", component: RaznoComponent},
    {path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
