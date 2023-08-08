import express from 'express';
import { PacijentController } from '../controllers/pacijent.controller';

const pacijentRouter = express.Router();

pacijentRouter.route('/getPacijent').post(
    (request, response) => { new PacijentController().getPacijent(request, response); }
)

export default pacijentRouter;