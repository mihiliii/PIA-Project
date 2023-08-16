import express from 'express';
import pacijentDB from '../models/pacijent.model';
import zakazaniPreglediDB from '../models/zakazaniPregled.model';

export class PacijentController {

    getAllPacijenti(request, response) {

        pacijentDB.find((err, pacijenti) => {
            if (err) console.log(err);
            else response.json(pacijenti);
        });
    }

    getPacijentById(request: express.Request, response: express.Response) {
        
        pacijentDB.findOne({'_id': request.body._id}, (err, pacijent) => {
            if (err) console.log(err);
            else response.json(pacijent);
        });
    }

    async getZakazaniPreglediListByPacijentId(request: express.Request, response: express.Response) {
        try {
            
            let zakazaniPreglediList = await zakazaniPreglediDB.find({pacijent: request.body.pacijent}).populate('pregled').populate('lekar');

            response.json(zakazaniPreglediList);
        }
        catch (err) {
            console.log(err);
        }   
    }

    deleteZakazaniPregled(request: express.Request, response: express.Response) {
        
        zakazaniPreglediDB.findByIdAndDelete(request.body._id, (err) => {
            if (err) console.log(err);
            else response.json({message: 'success'});
        });
    }
}