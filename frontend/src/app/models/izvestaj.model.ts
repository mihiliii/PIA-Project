import Lekar from "./lekar.model";
import Pacijent from "./pacijent.model";

export default class Izvestaj {
    _id: string;
    lekar: Lekar | string;
    pacijent: Pacijent | string;
    datum: string;
    vreme: string;
    razlogDolaska: string;
    dijagnoza: string;
    terapija: string;
    datumSeledecegPregleda: string;
}