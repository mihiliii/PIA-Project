import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PacijentProfilComponent } from './pacijent/pacijent-profil/pacijent-profil.component';
import { PacijentLekariComponent } from './pacijent/pacijent-lekari/pacijent-lekari.component';
import { LekarProfilComponent } from './lekar/lekar-profil/lekar-profil.component';
import { PacijentPreglediComponent } from './pacijent/pacijent-pregledi/pacijent-pregledi.component';
import { LekarPreglediComponent } from './lekar/lekar-pregledi/lekar-pregledi.component';
import { RaznoComponent } from './lekar/razno/razno.component';
import { MenadzerComponent } from './menadzer/menadzer.component';
import { UserEditComponent } from './display-components/user-edit/user-edit.component';

const routes: Routes = [
    {path: "", title:'Glavna', component: HomepageComponent},
    {path: "login", component: LoginComponent, data: {userType: ''}},
    {path: "register", component: RegisterComponent},
    {path: "menadzer", component: MenadzerComponent},
    {path: "login/menadzer", component: LoginComponent, data: {userType: 'menadzer'}},
    {path: "pacijent/profil", component: PacijentProfilComponent},
    {path: "pacijent/lekari", component: PacijentLekariComponent},
    {path: "pacijent/pregledi", component: PacijentPreglediComponent},
    {path: "lekar/profil", component:LekarProfilComponent},
    {path: "lekar/pregledi", component: LekarPreglediComponent},
    {path: "lekar/razno", component: RaznoComponent},
    {path: "user-edit", component: UserEditComponent},
    {path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
