import express from 'express';
import { PacijentController } from '../controllers/pacijent.controller';

const pacijentRouter = express.Router();

pacijentRouter.route('/getAllPacijenti').get(
    (request, response) => { new PacijentController().getAllPacijenti(request, response); }
);

pacijentRouter.route('/getPacijentById').post(
    (request, response) => { new PacijentController().getPacijentById(request, response); }
);

pacijentRouter.route('/getZakazaniPreglediListByPacijentId').post(
    (request, response) => { new PacijentController().getZakazaniPreglediListByPacijentId(request, response); }
);

pacijentRouter.route('/deleteZakazaniPregled').post(
    (request, response) => { new PacijentController().deleteZakazaniPregled(request, response); }
);

pacijentRouter.route('/getIzvestajListByPacijentId').post(
    (request, response) => { new PacijentController().getIzvestajListByPacijentId(request, response); }
);

export default pacijentRouter;