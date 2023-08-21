import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/authentication/login/login.component';
import { RegisterComponent } from './pages/authentication/register/register.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { PacijentProfilComponent } from './pages/pacijent/pacijent-profil/pacijent-profil.component';
import { PacijentLekariComponent } from './pages/pacijent/pacijent-lekari/pacijent-lekari.component';
import { LekarProfilComponent } from './pages/lekar/lekar-profil/lekar-profil.component';
import { PacijentPreglediComponent } from './pages/pacijent/pacijent-pregledi/pacijent-pregledi.component';
import { LekarPreglediComponent } from './pages/lekar/lekar-pregledi/lekar-pregledi.component';
import { RaznoComponent } from './pages/lekar/razno/razno.component';
import { MenadzerHomepageComponent } from './pages/menadzer/menadzer-homepage/menadzer-homepage.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

const routes: Routes = [
    {path: "", title:'Glavna', component: HomepageComponent},
    {path: "login", component: LoginComponent, data: {userType: ''}},
    {path: "register", component: RegisterComponent},
    {path: "menadzer", component: MenadzerHomepageComponent},
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
