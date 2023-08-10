import express from 'express';
import lekarDB from '../models/lekar.model';
import pregledDB from '../models/pregled.model';
import zakazanoDB from '../models/zakazano.model';

export class LekarController {

    getAllLekari(request, response) {

        lekarDB.find((err, lekari) => {
            if (err) console.log(err);
            else response.json(lekari);
        });

    }

    async getLekar(request, response) {
        let returnData = {};
        returnData['pregledi'] = [];

        try {
            let lekar = await lekarDB.findOne({'_id': request.body.id});
            returnData['lekar'] = lekar; 

            for (let id of lekar.pregledi) {
                let pregled = await pregledDB.findOne({'_id': id});
                returnData['pregledi'].push(pregled);
            }

            response.json(returnData);
        } 
        catch (error) {
            console.log(error);
        }
    }

    async zakaziPregled(request, response) {
        const data = request.body;

        try {
            let zakazaniPregledi = await zakazanoDB.find({'lekar': data.lekar._id, 'datum': data.datum});
            let condition = false;

            for (let iter of zakazaniPregledi) {
                let zakazanPregled = iter.vreme.split(':');
                let pocetakZakazanogPregleda = parseInt(zakazanPregled[0], 10) * 60 + parseInt(zakazanPregled[1], 10);
                let krajZakazanogPregleda = pocetakZakazanogPregleda + iter.pregled.trajanje;
                
                let pregled = data.vreme.split(':');
                let pocetakPregleda = parseInt(pregled[0], 10) * 60 + parseInt(pregled[1], 10);
                let krajPregleda = pocetakPregleda + parseInt(data.pregled.trajanje, 10);
                
                if (
                    !(pocetakPregleda < pocetakZakazanogPregleda && krajPregleda <= pocetakZakazanogPregleda) &&
                    !(pocetakPregleda >= krajZakazanogPregleda && krajPregleda > krajZakazanogPregleda)
                ) {
                    condition = true;
                    break;
                }
            }
            
            if (condition) response.json('zauzet termin');
            else {
                zakazanoDB.create(
                    {
                        'lekar': data.lekar._id,
                        'pregled': data.pregled,
                        'datum': data.datum,
                        'vreme': data.vreme
                    }, 
                    (err, data) => {
                        if (err) console.log(err);
                        else response.json('zakazan pregled');
                    }
                );
            }
        }
        catch (error) {
            console.log(error);
        }
    }

}