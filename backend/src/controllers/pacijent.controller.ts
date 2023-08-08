import express from 'express';
import pacijentDB from '../models/pacijent.model';

export class PacijentController {

    getPacijent(request: express.Request, response) {
        console.log(request.body);
        pacijentDB.findOne({'korisnickoIme': request.body.korisnickoIme}, (err, pacijent) => {
            if (err) console.log(err);
            else response.json(pacijent);
        });
    }
}