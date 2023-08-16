import express from "express";
import pacijentDB from '../models/pacijent.model';
import lekarDB from '../models/lekar.model';
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
    }

}