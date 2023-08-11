import Pregled from "./pregled.model";

export default class ZakazaniPregled {
    _id: string;
    pregled: string | Pregled;
    lekar: string;
    pacijent: string;
    datum: string;
    vreme: string;
    trajanje: number;
}