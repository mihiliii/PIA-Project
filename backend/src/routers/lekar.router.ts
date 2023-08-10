import express, { response } from 'express';
import { LekarController } from '../controllers/lekar.controller';

const lekarRouter = express.Router();

lekarRouter.route('/getLekar').post(
    (request, response) => { new LekarController().getLekar(request, response); }
);

lekarRouter.route('/getAllLekari').get(
    (request, response) => { new LekarController().getAllLekari(request, response); }
)

lekarRouter.route('/zakaziPregled').post(
    (request, response) => { new LekarController().zakaziPregled(request, response); }
)

export default lekarRouter;