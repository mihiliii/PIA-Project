import express from 'express';
import pacijentDB from '../models/pacijent.model';
import lekarDB from '../models/lekar.model';

export class RegisterController {

    async registerPacijent(request: express.Request, response: express.Response) {
        let data = request.body;
        let pacijent = await pacijentDB.findOne({$or: [{'korisnickoIme': data.korisnickoIme}, {'email': data.email}]});
        let lekar = await lekarDB.findOne({$or: [{'korisnickoIme': data.korisnickoIme}, {'email': data.email}]});
        
        if (!pacijent && !lekar) {
            pacijentDB.create({
                'korisnickoIme': data.korisnickoIme,
                'lozinka': data.lozinka,
                'ime': data.ime,
                'prezime': data.prezime,
                'adresa': data.adresa,
                'kontaktTelefon': data.kontaktTelefon,
                'email': data.email
            }, (err, pacijent) => {
                if (err) console.log(err);
                else response.json({'message': 'pacijent register success!'});
            });
        }
        else {
            if (pacijent !== null) {
                response.json(this.registerError(pacijent, data));
            }
            else if (lekar !== null) {
                response.json(this.registerError(lekar, data));
            }
        }
        
    }

    async registerLekar(request: express.Request, response: express.Response) {
        let data = request.body;
        let pacijent = await pacijentDB.findOne({$or: [{'korisnickoIme': data.korisnickoIme}, {'email': data.email}]});
        let lekar = await lekarDB.findOne({$or: [{'korisnickoIme': data.korisnickoIme}, {'email': data.email}]});
        
        if (!pacijent && !lekar) {
            lekarDB.create({
                'korisnickoIme': data.korisnickoIme,
                'lozinka': data.lozinka,
                'ime': data.ime,
                'prezime': data.prezime,
                'adresa': data.adresa,
                'kontaktTelefon': data.kontaktTelefon,
                'email': data.email,
                'brojLicence': data.brojLicence,
                'specijalizacija': data.specijalizacija,
                'ogranakOrdinacije': data.ogranakOrdinacije
            }, (err, lekar) => {
                if (err) console.log(err);
                else response.json({'message': 'lekar register success!'});
            });
        }
        else {
            if (pacijent !== null) {
                response.json(this.registerError(pacijent, data));
            }
            else if (lekar !== null) {
                response.json(this.registerError(lekar, data));
            }
        }
    }

    registerError(object1, object2) {
        if (object1.korisnickoIme == object2.korisnickoIme) return {'message': 'Error: korisnickoIme already exists!'};
        else if (object1.email == object2.email) return {'message': 'Error: email already exists!'};
        else return {'message': 'Error: unknown'};
    }
}