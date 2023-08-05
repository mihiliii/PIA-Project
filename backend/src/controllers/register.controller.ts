import express from 'express';
import pacijentDB from '../models/pacijent.model';
import lekarDB from '../models/lekar.model';
import multer from 'multer';
import path from 'path';

const imageStorage = multer.diskStorage({
    destination: './src/images',
    filename: (req, file, callback) => {
        let korisnickoIme = req.body.korisnickoIme;
        callback(null, korisnickoIme + path.extname(file.originalname));
    }
});

const upload = multer({storage: imageStorage}).single('image');

export class RegisterController {

    async registerPacijent(request: any, response: express.Response) {
        let data = request.body;
        let pacijent = await pacijentDB.findOne({$or: [{'korisnickoIme': data.korisnickoIme}, {'email': data.email}]});
        let lekar = await lekarDB.findOne({$or: [{'korisnickoIme': data.korisnickoIme}, {'email': data.email}]});
        
        console.log(request.body);
        if (!pacijent && !lekar) {
            pacijentDB.create({
                'korisnickoIme': data.korisnickoIme,
                'lozinka': data.lozinka,
                'ime': data.ime,
                'prezime': data.prezime,
                'adresa': data.adresa,
                'kontaktTelefon': data.kontaktTelefon,
                'email': data.email,
                'image': 'default.jpg'
            }, (err) => {
                if (err) console.log(err);
                else response.json({'message': 'pacijent register success!'});  
            });
        }
        else if (pacijent !== null) response.json(this.registerError(pacijent, data));
        else if (lekar !== null) response.json(this.registerError(lekar, data));
    }

    async registerLekar(request: express.Request, response: express.Response) {
        let data = request.body;
        let pacijent = await pacijentDB.findOne({$or: [{'korisnickoIme': data.korisnickoIme}, {'email': data.email}]});
        let lekar = await lekarDB.findOne({$or: [{'korisnickoIme': data.korisnickoIme}, {'email': data.email}]});
        
        if (!pacijent && !lekar) {
            lekarDB.create({
                'korisnickoIme': data.korisnickoIme,
                'lozinka': data.lozinka,
                'ime': data.ime,
                'prezime': data.prezime,
                'adresa': data.adresa,
                'kontaktTelefon': data.kontaktTelefon,
                'email': data.email,
                'brojLicence': data.brojLicence,
                'specijalizacija': data.specijalizacija,
                'ogranakOrdinacije': data.ogranakOrdinacije,
                'image': 'default.jpg'
            }, (err) => {
                if (err) console.log(err);
                else response.json({'message': 'lekar register success!'});
            });
        }
        else if (pacijent !== null) response.json(this.registerError(pacijent, data));
        else if (lekar !== null) response.json(this.registerError(lekar, data));
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
}