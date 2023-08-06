import express from 'express';
import { HomepageController } from '../controllers/homepage.controller';

const homepageRouter = express.Router();

homepageRouter.route('/getLekari').get(
    (request, response) => { new HomepageController().getLekari(request, response); }
)

export default homepageRouter;