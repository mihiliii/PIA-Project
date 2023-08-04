import express from 'express';
import PacijentDB from '../models/pacijent.model';

export class LoginController {

    login (request: express.Request, response: express.Response) {
        let data = request.body;

        PacijentDB.findOne({'username': data.username, 'password': data.password}, (err, pacijent) => {
            if (err) console.log(err);
            else response.json(pacijent);
        });
    }
}