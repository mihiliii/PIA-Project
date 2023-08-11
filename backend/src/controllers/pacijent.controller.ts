import express from 'express';
import pacijentDB from '../models/pacijent.model';
import zakazanoDB from '../models/zakazano.model';
import pregledDB from '../models/pregled.model';

export class PacijentController {

    getPacijent(request: express.Request, response) {
        
        pacijentDB.findOne({'korisnickoIme': request.body.korisnickoIme}, (err, pacijent) => {
            if (err) console.log(err);
            else response.json(pacijent);
        });
    }

    async getPregledi(request, response) {
        try {
            
            let zakazaniPregledi = await zakazanoDB.find({pacijent: request.body._id}).populate('pregled');

            response.json(zakazaniPregledi);
        }
        catch (err) {
            console.log(err);
        }   
    }

    cancelPregled(request, response) {
        zakazanoDB.findByIdAndDelete(request.body._id, (err) => {
            if (err) console.log(err);
            else response.json({message: 'brisanje uspesno'});
        });
    }
}