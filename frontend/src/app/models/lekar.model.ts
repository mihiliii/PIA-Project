import Pregled from "./pregled.model";

export default class Lekar {
    _id: string;
    korisnickoIme: string;
    lozinka: string;
    ime: string;
    prezime: string;
    adresa: string;
    kontaktTelefon: string;
    email: string;
    brojLicence: string;
    specijalizacija: string;
    ogranakOrdinacije: string;
    image: string;
    status: string;
    pregledi: [Pregled];
}