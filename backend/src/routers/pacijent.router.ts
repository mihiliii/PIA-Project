import express from 'express';
import { PacijentController } from '../controllers/pacijent.controller';

const pacijentRouter = express.Router();

pacijentRouter.route('/getPacijent').post(
    (request, response) => { new PacijentController().getPacijent(request, response); }
);

pacijentRouter.route('/getPregledi').post(
    (request, response) => { new PacijentController().getPregledi(request, response); }
);

pacijentRouter.route('/cancelPregled').post(
    (request, response) => { new PacijentController().cancelPregled(request, response); }
);

export default pacijentRouter;