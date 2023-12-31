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

            let pacijent = await pacijentDB.findOne({'korisnickoIme': data.korisnickoIme, 'lozinka': data.lozinka, 'status': 'aktivan'});
            let lekar = await lekarDB.findOne({'korisnickoIme': data.korisnickoIme, 'lozinka': data.lozinka});

            if (pacijent) response.json({_id: pacijent._id, korisnickoIme: pacijent.korisnickoIme, userType: 'pacijent'});
            else if (lekar) response.json({_id: lekar._id, korisnickoIme: lekar.korisnickoIme, userType: 'lekar'});
            else response.json(null);
        }
    }

    async registerPacijent(request: express.Request, response: express.Response) {
        let requestData = request.body;

        let pacijent = await pacijentDB.findOne({$or: [{'korisnickoIme': requestData.korisnickoIme}, {'email': requestData.email}]});
        let lekar = await lekarDB.findOne({$or: [{'korisnickoIme': requestData.korisnickoIme}, {'email': requestData.email}]});
        
        if (!pacijent && !lekar) {

            pacijentDB.create({
                'korisnickoIme': requestData.korisnickoIme,
                'lozinka': requestData.lozinka,
                'ime': requestData.ime,
                'prezime': requestData.prezime,
                'adresa': requestData.adresa,
                'kontaktTelefon': requestData.kontaktTelefon,
                'email': requestData.email,
                'image': 'default.jpg',
                'status': 'neaktivan'
            }, (err) => {
                if (err) console.log(err);
                else response.json({'message': 'success'});  
            });
        }
        else if (pacijent != null) response.json(this.registerError(pacijent, requestData));
        else if (lekar != null) response.json(this.registerError(lekar, requestData));
    }

    uploadImage(request, response) {
        
        upload(request, response, (err) => {
            if (err) console.log('Error: image upload failed!');
            else {
                let type = request.body.type;

                if (type == 'pacijent') {
                    pacijentDB.findOneAndUpdate({'korisnickoIme': request.body.korisnickoIme},
                        {'image': request.body.korisnickoIme + path.extname(request.file.originalname)}, (err) => {
                            if (err) console.log(err);
                            else response.json({'message': 'success'});
                    });
                }
                if (type == 'lekar') {
                    lekarDB.findOneAndUpdate({'korisnickoIme': request.body.korisnickoIme},
                        {'image': request.body.korisnickoIme + path.extname(request.file.originalname)}, (err) => {
                            if (err) console.log(err);
                            else response.json({'message': 'success'});
                    });
                }
            }
        });
    }

    registerError(object1, object2) {
        if (object1.korisnickoIme == object2.korisnickoIme) return {'message': 'Error: korisnicko ime vec postoji.'};
        else if (object1.email == object2.email) return {'message': 'Error: email adresa vec postoji.'};
        else return {'message': 'Error: nepoznata greska, pokusajte ponovo.'};
    }

}