import express from 'express';
import lekarDB from '../models/lekar.model';
import terminDB from '../models/termin.model';

export class LekarController {

    getAllLekari(request, response) {

        lekarDB.find((err, lekari) => {
            if (err) console.log(err);
            else response.json(lekari);
        });

    }

    async getLekar(request, response) {
        try {

            let lekar = await lekarDB.findById(request.body.id).populate('pregledi');

            response.json(lekar);
        } 
        catch (error) {
            console.log(error);
        }
    }

    async zakaziPregled(request, response) {
        const data = request.body;

        try {
            let zakazaniTermini = await terminDB.find({'lekar': data.lekar._id, 'datum': data.datum});
            let condition = false;

            for (let termin of zakazaniTermini) {
                let zakazanPregled = termin.vreme.split(':');
                let pocetakZakazanog = parseInt(zakazanPregled[0], 10) * 60 + parseInt(zakazanPregled[1], 10);
                let krajZakazanog = pocetakZakazanog + termin.trajanje;
                
                let noviPregled = data.vreme.split(':');
                let pocetakNovog = parseInt(noviPregled[0], 10) * 60 + parseInt(noviPregled[1], 10);
                let krajNovog = pocetakNovog + parseInt(data.pregled.trajanje, 10);
                
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

                await terminDB.create(
                    {
                        'pregled': data.pregled._id,
                        'lekar': data.lekar._id,
                        'pacijent': data.pacijent,
                        'datum': data.datum,
                        'vreme': data.vreme,
                        'trajanje': data.pregled.trajanje
                    }
                );

                response.json({message: 'zakazan'});
            }
        }
        catch (error) {
            console.log(error);
        }
    }

}