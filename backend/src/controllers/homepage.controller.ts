import express from 'express';
import pacijentDB from '../models/pacijent.model';
import lekarDB from '../models/lekar.model';
import menadzerDB from '../models/menadzer.model';

export class HomepageController {

    getLekari(request, response) {

        lekarDB.find((err, lekari) => {
            if (err) console.log(err);
            else response.json(lekari);
        });

    }
    
}