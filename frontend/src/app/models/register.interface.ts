export class RegisterInterface {

    korisnickoIme: string;
    lozinka: string;
    ponovljenaLozinka: string;
    ime: string;
    prezime: string;
    adresa: string;
    kontaktTelefon: string;
    email: string;
    brojLicence: string;
    specijalizacija: string;
    ogranakOrdinacije: string;

    constructor() {
        this.korisnickoIme = '';
        this.lozinka = '';
        this.ponovljenaLozinka = '';
        this.ime = '';
        this.prezime = '';
        this.adresa = '';
        this.kontaktTelefon = '';
        this.email = '';
        this.brojLicence = '';
        this.specijalizacija = '';
        this.ogranakOrdinacije = '';
    }

}