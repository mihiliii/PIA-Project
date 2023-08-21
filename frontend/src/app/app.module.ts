import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { RegisterComponent } from './pages/authentication/register/register.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { PacijentProfilComponent } from './pages/pacijent/pacijent-profil/pacijent-profil.component';
import { PacijentLekariComponent } from './pages/pacijent/pacijent-lekari/pacijent-lekari.component';
import { TabelaLekaraComponent } from './components/tabela-lekara/tabela-lekara.component';
import { LekarProfilComponent } from './pages/lekar/lekar-profil/lekar-profil.component';
import { PacijentPreglediComponent } from './pages/pacijent/pacijent-pregledi/pacijent-pregledi.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LekarPreglediComponent } from './pages/lekar/lekar-pregledi/lekar-pregledi.component';
import { RaznoComponent } from './pages/lekar/razno/razno.component';
import { MenadzerHomepageComponent } from './pages/menadzer/menadzer-homepage/menadzer-homepage.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { NewLekarComponent } from './components/new-lekar/new-lekar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    PacijentProfilComponent,
    PacijentLekariComponent,
    TabelaLekaraComponent,
    LekarProfilComponent,
    PacijentPreglediComponent,
    NavbarComponent,
    LekarPreglediComponent,
    RaznoComponent,
    MenadzerHomepageComponent,
    UserEditComponent,
    NewLekarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
