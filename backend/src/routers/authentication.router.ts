import express from 'express';
import { AuthenticationController } from '../controllers/authentication.controller';

const authenticationRouter = express.Router();

authenticationRouter.route('/login').post(
    (request, response) => { new AuthenticationController().login(request, response); }
);

authenticationRouter.route('/registerPacijent').post(
    (request, response) => { new AuthenticationController().registerPacijent(request, response); }
);

authenticationRouter.route('/uploadImage').post(
    (request, response) => { new AuthenticationController().uploadImage(request,response); }
);

authenticationRouter.route('/getRegisterRequests').get(
    (request, response) => { new AuthenticationController().getRegisterRequests(request,response); }
);

authenticationRouter.route('/acceptRegisterRequests').post(
    (request, response) => { new AuthenticationController().acceptRegisterRequests(request,response); }
);

authenticationRouter.route('/declineRegisterRequests').post(
    (request, response) => { new AuthenticationController().declineRegisterRequests(request,response); }
);

export default authenticationRouter;