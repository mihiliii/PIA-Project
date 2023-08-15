import Lekar from "./lekar.model";
import Pacijent from "./pacijent.model";
import Pregled from "./pregled.model";

export default class ZakazaniPregled {
    _id: string;
    pregled: Pregled | string;
    lekar: Lekar | string;
    pacijent: Pacijent | string;
    datum: string;
    vreme: string;
    trajanje: number;
}