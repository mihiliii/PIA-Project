import express, { response } from 'express';
import { LekarController } from '../controllers/lekar.controller';

const lekarRouter = express.Router();

lekarRouter.route('/getLekarById').post(
    (request, response) => { new LekarController().getLekarById(request, response); }
);

lekarRouter.route('/getAllLekari').get(
    (request, response) => { new LekarController().getAllLekari(request, response); }
);

lekarRouter.route('/addNewZakazaniPregled').post(
    (request, response) => { new LekarController().addNewZakazaniPregled(request, response); }
);

lekarRouter.route('/getPreglediIsteSpecijalizacije').post(
    (request, response) => { new LekarController().getPreglediIsteSpecijalizacije(request, response); }
);

lekarRouter.route('/updateLekarPregled').post(
    (request, response) => { new LekarController().updateLekarPregled(request, response); }
);

lekarRouter.route('/getZakazaniPreglediByLekarId').post(
    (request, response) => { new LekarController().getZakazaniPreglediByLekarId(request, response); }
);

lekarRouter.route('/addNewPregled').post(
    (request, response) => { new LekarController().addNewPregled(request, response); } 
);

export default lekarRouter;