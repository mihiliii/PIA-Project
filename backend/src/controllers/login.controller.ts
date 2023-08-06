import express from 'express';
import pacijentDB from '../models/pacijent.model';
import lekarDB from '../models/lekar.model';
import menadzerDB from '../models/menadzer.model';

export class LoginController {

    async login (request: express.Request, response: express.Response) {
        let data = request.body;
        console.log(data);

        if (data.userType == 'menadzer'){

            menadzerDB.findOne({'korisnickoIme': data.korisnickoIme, 'lozinka': data.lozinka}, (err, menadzer) => {
                if (err) console.log(err);
                else response.json({korisnickoIme: menadzer.korisnickoIme, userType: 'menadzer'});
            });
        }
        else {

            let pacijent = await pacijentDB.findOne({'korisnickoIme': data.korisnickoIme, 'lozinka': data.lozinka});
            let lekar = await lekarDB.findOne({'korisnickoIme': data.korisnickoIme, 'lozinka': data.lozinka});

            if (pacijent) response.json({korisnickoIme: pacijent.korisnickoIme, userType: 'pacijent'});
            else if (lekar) response.json({korisnickoIme: lekar.korisnickoIme, userType: 'lekar'});
            else response.json(null);
        }
    }
}