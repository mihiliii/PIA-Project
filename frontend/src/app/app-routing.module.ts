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
import { RouteGuard } from './guards/route.guard';

const routes: Routes = [
    {path: "", title:'Glavna', component: HomepageComponent},
    {path: "login", component: LoginComponent, canActivate: [RouteGuard], data: {userType: '', roles: []}},
    {path: "register", component: RegisterComponent, canActivate: [RouteGuard], data: {roles: []}},
    {path: "menadzer", component: MenadzerHomepageComponent, canActivate: [RouteGuard], data: {roles: ['menadzer']}},
    {path: "login/menadzer", component: LoginComponent, canActivate: [RouteGuard], data: {userType: 'menadzer', roles: []}},
    {path: "pacijent/profil", component: PacijentProfilComponent, canActivate: [RouteGuard], data: {roles: ['pacijent']}},
    {path: "pacijent/lekari", component: PacijentLekariComponent, canActivate: [RouteGuard], data: {roles: ['pacijent']}},
    {path: "pacijent/pregledi", component: PacijentPreglediComponent, canActivate: [RouteGuard], data: {roles: ['pacijent']}},
    {path: "lekar/profil", component:LekarProfilComponent, canActivate: [RouteGuard], data: {roles: ['pacijent', 'lekar']}},
    {path: "lekar/pregledi", component: LekarPreglediComponent, canActivate: [RouteGuard], data: {roles: ['lekar']}},
    {path: "lekar/razno", component: RaznoComponent, canActivate: [RouteGuard], data: {roles: ['lekar']}},
    {path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
