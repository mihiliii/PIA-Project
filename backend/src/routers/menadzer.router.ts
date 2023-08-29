import express, { response } from 'express';
import { MenadzerController } from '../controllers/menadzer.controller';

const menadzerRouter = express.Router();

menadzerRouter.route('/getRegisterRequests').get(
    (request, response) => { new MenadzerController().getRegisterRequests(request,response); }
);

menadzerRouter.route('/acceptRegisterRequests').post(
    (request, response) => { new MenadzerController().acceptRegisterRequests(request,response); }
);

menadzerRouter.route('/declineRegisterRequests').post(
    (request, response) => { new MenadzerController().declineRegisterRequests(request,response); }
);

menadzerRouter.route('/deleteUser').post(
    (request, response) => { new MenadzerController().deleteUser(request, response); }
);

menadzerRouter.route('/updateUser').post(
    (request, response) => { new MenadzerController().updateUser(request, response); }
);

menadzerRouter.route('/addNewLekar').post(
    (request, response) => { new MenadzerController().addNewLekar(request, response); }
);

menadzerRouter.route('/getAllPregledi').get(
    (request, response) => { new MenadzerController().getAllPregledi(request, response); }
);

menadzerRouter.route('/updateUserPassword').post(
    (request, response) => { new MenadzerController().updateUserPassword(request, response); }
);

menadzerRouter.route('/acceptPregledi').post(
    (request, response) => { new MenadzerController().acceptPregledi(request, response); }
);

menadzerRouter.route('/declinePregledi').post(
    (request, response) => { new MenadzerController().declinePregledi(request, response); }
);

export default menadzerRouter;