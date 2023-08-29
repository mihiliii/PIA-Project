import express from 'express';
import lekarDB from '../models/lekar.model';
import zakazaniPreglediDB from '../models/zakazaniPregled.model';
import pregledDB from '../models/pregled.model';
import izvestajDB from '../models/izvestaj.model';

export class LekarController {

    getAllLekari(request: express.Request, response: express.Response) {

        lekarDB.find((err, lekari) => {
            if (err) console.log(err);
            else response.json(lekari);
        });
    }

    async getLekarById(request: express.Request, response: express.Response) {
        try {

            let lekar = await lekarDB.findById(request.body._id).populate('pregledi');

            response.json(lekar);
        } 
        catch (error) {
            console.log(error);
        }
    }

    async addNewZakazaniPregled(request: express.Request, response: express.Response) {
        try {
            let zakazaniTermini = await zakazaniPreglediDB.find({'lekar': request.body.lekar._id, 'datum': request.body.datum});
            let condition = false;

            for (let termin of zakazaniTermini) {
                let zakazanPregled = termin.vreme.split(':');
                let pocetakZakazanog = parseInt(zakazanPregled[0], 10) * 60 + parseInt(zakazanPregled[1], 10);
                let krajZakazanog = pocetakZakazanog + termin.trajanje;
                
                let noviPregled = request.body.vreme.split(':');
                let pocetakNovog = parseInt(noviPregled[0], 10) * 60 + parseInt(noviPregled[1], 10);
                let krajNovog = pocetakNovog + parseInt(request.body.pregled.trajanje, 10);
                
                if (
                    !(pocetakNovog < pocetakZakazanog && krajNovog <= pocetakZakazanog) &&
                    !(pocetakNovog >= krajZakazanog && krajNovog > krajZakazanog)
                ) {
                    condition = true;
                    break;
                }
            }
            
            if (condition) response.json({message: 'zauzet'});
            else {

                await zakazaniPreglediDB.create(
                    {
                        'pregled': request.body.pregled._id,
                        'lekar': request.body.lekar._id,
                        'pacijent': request.body.pacijent,
                        'datum': request.body.datum,
                        'vreme': request.body.vreme,
                        'trajanje': request.body.pregled.trajanje
                    }
                );

                response.json({message: 'uspesno zakazan'});
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    async getPreglediIsteSpecijalizacije(request: express.Request, response: express.Response) {
        try {

            let pregledi = await pregledDB.find({'specijalizacija': request.body.specijalizacija});

            response.json(pregledi);
        }
        catch (error) {
            console.log(error);
        }
    }

    async updateLekarPregled(request: express.Request, response: express.Response) {
        try {

            let document = await lekarDB.findByIdAndUpdate(request.body._id, {'pregledi': request.body.pregledi});

            if (document != null){
                response.json({message: 'Pregled update success'});
            }
            else {
                response.json({message: 'Lekar not found'});
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    async getZakazaniPreglediByLekarId(request: express.Request, response: express.Response) {
        try {

            let termini = await zakazaniPreglediDB.find({lekar: request.body._id}).populate('pregled').populate('pacijent').sort({'datum': 1, 'vreme': 1});

            response.json(termini);
        }
        catch (error) {
            console.log(error);
        }
    }

    addNewPregled(request: express.Request, response: express.Response) {
        
        pregledDB.create({
                'naziv': request.body.naziv,
                'trajanje': request.body.trajanje,
                'cena': request.body.cena,
                'specijalizacija': request.body.specijalizacija,
                'status': 'neaktivan'
            }, 
            (error) => {
                if (error) console.log(error);
                else response.json({message: 'addNoviPregled success'});
            });
    }

    getAllIzvestaji(request, response) {

        izvestajDB.find({'lekar': request.body.lekar, 'pacijent': request.body.pacijent}, (err, izvestaji) => {
            if (err) console.log(err);
            else response.json(izvestaji);
        });
    }

    createNewIzvestaj(request, response) {

        izvestajDB.create({
            'lekar': request.body.lekar,
            'pacijent': request.body.pacijent,
            'datum': request.body.datum,
            'vreme': request.body.vreme,
            'razlogDolaska': request.body.razlogDolaska,
            'dijagnoza': request.body.dijagnoza,
            'terapija': request.body.terapija,
            'datumSledecegPregleda': request.body.datumSledecegPregleda
        }, (err) => {
            if (err) console.log(err);
            else {

                zakazaniPreglediDB.findByIdAndDelete(request.body.zakazaniPregledId, (err) => {
                    if (err) console.log(err);
                    else response.json({'message': 'success'}); 
                });
            }
        });
    }

}