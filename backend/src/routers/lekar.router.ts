import express, { response } from 'express';
import { LekarController } from '../controllers/lekar.controller';

const lekarRouter = express.Router();

lekarRouter.route('/getLekar').post(
    (request, response) => { new LekarController().getLekar(request, response); }
);

lekarRouter.route('/getAllLekari').get(
    (request, response) => { new LekarController().getAllLekari(request, response); }
);

lekarRouter.route('/zakaziPregled').post(
    (request, response) => { new LekarController().zakaziPregled(request, response); }
);

lekarRouter.route('/getPreglediIsteSpecijalizacije').post(
    (request, response) => { new LekarController().getPreglediIsteSpecijalizacije(request, response); }
);

lekarRouter.route('/updatePregled').post(
    (request, response) => { new LekarController().updatePregled(request, response); }
);

lekarRouter.route('/getAllTermini').post(
    (request, response) => { new LekarController().getAllTermini(request, response); }
);

lekarRouter.route('/addNoviPregled').post(
    (request, response) => { new LekarController().addNoviPregled(request, response); } 
);

export default lekarRouter;