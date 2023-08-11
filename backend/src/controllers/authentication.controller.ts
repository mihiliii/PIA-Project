import pacijentDB from '../models/pacijent.model';
import lekarDB from '../models/lekar.model';
import menadzerDB from '../models/menadzer.model';

import express from 'express';
import multer from 'multer';
import path from 'path';

const imageStorage = multer.diskStorage({
    destination: './images',
    filename: (req, file, callback) => {
        let korisnickoIme = req.body.korisnickoIme;
        callback(null, korisnickoIme + path.extname(file.originalname));
    }
});

const upload = multer({storage: imageStorage}).single('image');

export class AuthenticationController {

    async login (request: express.Request, response: express.Response) {
        let data = request.body;

        if (data.userType == 'menadzer'){

            menadzerDB.findOne({'korisnickoIme': data.korisnickoIme, 'lozinka': data.lozinka}, (err, menadzer) => {
                if (err) console.log(err);
                else response.json({korisnickoIme: menadzer.korisnickoIme, userType: 'menadzer'});
            });
        }
        else {

            let pacijent = await pacijentDB.findOne({'korisnickoIme': data.korisnickoIme, 'lozinka': data.lozinka});
            let lekar = await lekarDB.findOne({'korisnickoIme': data.korisnickoIme, 'lozinka': data.lozinka});

            if (pacijent) response.json({_id: pacijent._id, korisnickoIme: pacijent.korisnickoIme, userType: 'pacijent'});
            else if (lekar) response.json({_id: lekar._id, korisnickoIme: lekar.korisnickoIme, userType: 'lekar'});
            else response.json(null);
        }
    }

    async registerPacijent(request: any, response: express.Response) {
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
                'email': data.email,
                'image': 'default.jpg',
                'status': 'neaktivan'
            }, (err) => {
                if (err) console.log(err);
                else response.json({'message': 'pacijent register success!'});  
            });
        }
        else if (pacijent != null) response.json(this.registerError(pacijent, data));
        else if (lekar != null) response.json(this.registerError(lekar, data));
    }

    uploadImage(request, response) {
        
        upload(request, response, (err) => {
            if (err) console.log('Error: uploadImage');
            else {
                let type = request.body.type;

                if (type == 'pacijent') {
                    pacijentDB.findOneAndUpdate({'korisnickoIme': request.body.korisnickoIme},
                        {'image': request.body.korisnickoIme + path.extname(request.file.originalname)}, (err) => {
                            if (err) console.log(err);
                            else response.json({'message': 'image upload success!'});
                    });
                }
                if (type == 'lekar') {
                    lekarDB.findOneAndUpdate({'korisnickoIme': request.body.korisnickoIme},
                        {'image': request.body.korisnickoIme + path.extname(request.file.originalname)}, (err) => {
                            if (err) console.log(err);
                            else response.json({'message': 'image upload success!'});
                    });
                }
            }
        });
    }

    registerError(object1, object2) {
        if (object1.korisnickoIme == object2.korisnickoIme) return {'message': 'Error: korisnickoIme already exists!'};
        else if (object1.email == object2.email) return {'message': 'Error: email already exists!'};
        else return {'message': 'Error: unknown'};
    }

    async getRegisterRequests(request, response) {
        try {
            let pacijenti = await pacijentDB.find({'status': 'neaktivan'});
            let lekari = await lekarDB.find({'status': 'neaktivan'});

            const responseData = {
                pacijentArray: pacijenti,
                lekarArray: lekari
            }

            response.json(responseData);
        }
        catch {
            console.log("Error: getRegisterRequests()");
        }
    }

    acceptRegisterRequests(request, response) {
        let pacijenti = request.body.pacijenti;
        let lekari = request.body.lekari;

        for (let pacijent of pacijenti) {
            pacijentDB.updateOne({'korisnickoIme': pacijent.korisnickoIme}, {$set: {'status': 'aktivan'}}, (err, pacijent) => {
                if (err) console.log(err);
                else console.log(pacijent);
            });
        }
        for (let lekar of lekari) {
            lekarDB.updateOne({'korisnickoIme': lekar.korisnickoIme}, {$set: {'status': 'aktivan'}}, (err, lekar) => {
                if (err) console.log(err);
                else console.log(lekar);
            });
        }
        response.json({'message': 'ok'});
    }

    declineRegisterRequests(request, response) {
        let pacijenti = request.body.pacijenti;
        let lekari = request.body.lekari;

        for (let pacijent of pacijenti) {
            pacijentDB.updateOne({'korisnickoIme': pacijent.korisnickoIme}, {$set: {'status': 'neprihvacen'}}, (err, pacijent) => {
                if (err) console.log(err);
                else console.log(pacijent);
            });
        }
        for (let lekar of lekari) {
            lekarDB.updateOne({'korisnickoIme': lekar.korisnickoIme}, {$set: {'status': 'neprihvacen'}}, (err, lekari) => {
                if (err) console.log(err);
                else console.log(lekari);
            });
        }
        response.json({'message': 'ok'});
    }
}