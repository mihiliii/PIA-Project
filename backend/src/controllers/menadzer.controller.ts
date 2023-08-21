import express from "express";
import pacijentDB from '../models/pacijent.model';
import lekarDB from '../models/lekar.model';
import pregledDB from '../models/pregled.model';
import * as fs from 'node:fs';

export class MenadzerController {

    async getRegisterRequests(request: express.Request, response: express.Response) {
        try {

            let responseData = await pacijentDB.find({'status': 'neaktivan'});

            response.json(responseData);
        }
        catch {
            console.log("Error: getRegisterRequests()");
        }
    }

    acceptRegisterRequests(request: express.Request, response: express.Response) {

        for (let pacijent of request.body.pacijentList) {
           
            pacijentDB.updateOne({'korisnickoIme': pacijent.korisnickoIme}, {$set: {'status': 'aktivan'}}, (err, pacijent) => {
                if (err) console.log(err);
                else response.json({'message': 'success'});
            });
        }

    }

    declineRegisterRequests(request: express.Request, response: express.Response) {

        for (let pacijent of request.body.pacijentList) {
           
            pacijentDB.updateOne({'korisnickoIme': pacijent.korisnickoIme}, {$set: {'status': 'blokiran'}}, (err, pacijent) => {
                if (err) console.log(err);
                else response.json({'message': 'success'});
            });
        }

    }

    deleteUser(request: express.Request, response: express.Response) {

        if (request.body.userType == 'pacijent') {

            pacijentDB.findByIdAndDelete(request.body._id, (err, pacijent) => {
                if (err) console.log(err);
                else if (pacijent != null) {
                    if (pacijent.image != 'default.jpg') {
 
                        fs.unlink('./images/' + pacijent.image, function(err) {
                            if(err && err.code == 'ENOENT') {
                                console.log("File doesn't exist");
                            } else if (err) {
                                console.error("Error occurred while trying to remove file");
                            } else {
                                console.log(`removed`);
                            }
                        });
                    }

                    response.json({'message': 'success'});
                }
            });
        }
        else if (request.body.userType == 'lekar') {

            lekarDB.findByIdAndDelete(request.body.user._id, (err, lekar) => {
                if (err) console.log(err);
                else if (lekar != null) {
                    if (lekar.image != 'default.jpg') {
 
                        fs.unlink('./images/' + lekar.image, function(err) {
                            if(err && err.code == 'ENOENT') {
                                console.log("File doesn't exist");
                            } else if (err) {
                                console.error("Error occurred while trying to remove file");
                            } else {
                                console.log(`removed`);
                            }
                        });
                    }

                    response.json({'message': 'success'});
                }
            });
        }
        else response.json('userType error, deleteUser()');
    }

    async updateUser(request: express.Request, response: express.Response) {

        if (request.body.userType == 'pacijent') {

            pacijentDB.findByIdAndUpdate(request.body._id, {
                'korisnickoIme': request.body.korisnickoIme,
                'lozinka': request.body.lozinka,
                'ime': request.body.ime,
                'prezime': request.body.prezime,
                'adresa': request.body.adresa,
                'kontaktTelefon': request.body.kontaktTelefon,
                'email': request.body.email,
            }, (err, oldPacijent) => {
                if (err) console.log(err);
                else if (oldPacijent != null) {
                    
                    if (oldPacijent.korisnickoIme != request.body.korisnickoIme && oldPacijent.image != 'default.jpg'){

                        let filename = request.body.korisnickoIme + '.' + oldPacijent.image.split('.').pop();

                        fs.rename('./images/' + oldPacijent.image, './images/' + filename, (err) => {
                            if (err) {
                                console.log('Error occured while trying to change file name');
                            }
                            else {
                                
                                pacijentDB.findByIdAndUpdate(request.body._id, {'image': filename}, (err) => {
                                    if (err) console.log(err)
                                    else response.json({'message': 'success'});
                                });
                            }
                        });
                    }
                    else {
                        response.json({'message': 'success'});
                    }
                }
            });

        }

        else if (request.body.userType == 'lekar') {

            lekarDB.findByIdAndUpdate(request.body._id, {
                'korisnickoIme': request.body.korisnickoIme,
                'lozinka': request.body.lozinka,
                'ime': request.body.ime,
                'prezime': request.body.prezime,
                'adresa': request.body.adresa,
                'kontaktTelefon': request.body.kontaktTelefon,
                'email': request.body.email,
                'brojLicence': request.body.brojLicence,
                'specijalizacija': request.body.specijalizacija,
                'ogranakOrdinacije': request.body.ogranakOrdinacije
            }, (err, oldLekar) => {
                if (err) console.log(err);
                else if (oldLekar != null) {
                    
                    if (oldLekar.korisnickoIme != request.body.korisnickoIme && oldLekar.image != 'default.jpg'){

                        let filename = request.body.korisnickoIme + '.' + oldLekar.image.split('.').pop();

                        fs.rename('./images/' + oldLekar.image, './images/' + filename, (err) => {
                            if (err) {
                                console.log('Error occured while trying to change file name');
                            }
                            else {
                                
                                lekarDB.findByIdAndUpdate(request.body._id, {'image': filename}, (err) => {
                                    if (err) console.log(err)
                                    else response.json({'message': 'success'});
                                });
                            }
                        });
                    }
                    else {
                        response.json({'message': 'success'});
                    }
                }
            });
        }
    }

    async addNewLekar(request: express.Request, response: express.Response) {

        let pacijent = await pacijentDB.findOne({$or: [{'korisnickoIme': request.body.korisnickoIme}, {'email': request.body.email}]});
        let lekar = await lekarDB.findOne({$or: [{'korisnickoIme': request.body.korisnickoIme}, {'email': request.body.email}]});
        
        if (!pacijent && !lekar) {

            lekarDB.create({
                'korisnickoIme': request.body.korisnickoIme,
                'lozinka': request.body.lozinka,
                'ime': request.body.ime,
                'prezime': request.body.prezime,
                'adresa': request.body.adresa,
                'kontaktTelefon': request.body.kontaktTelefon,
                'email': request.body.email,
                'brojLicence': request.body.brojLicence,
                'specijalizacija': request.body.specijalizacija,
                'ogranakOrdinacije': request.body.ogranakOrdinacije,
                'image': 'default.jpg',
                'pregledi': []
            }, (err) => {
                if (err) console.log(err);
                else response.json({'message': 'success'});  
            });
        }
        else if (pacijent != null) response.json(this.registerError(pacijent, request.body));
        else if (lekar != null) response.json(this.registerError(lekar, request.body));
    }
    
    registerError(object1, object2) {
        if (object1.korisnickoIme == object2.korisnickoIme) return {'message': 'Error: korisnickoIme already exists!'};
        else if (object1.email == object2.email) return {'message': 'Error: email already exists!'};
        else return {'message': 'Error: unknown'};
    }

    getAllPregledi(request, response) {

        pregledDB.find((err, pregledi) => {
            if (err) console.log(err);
            else response.json(pregledi);
        })
    }

}