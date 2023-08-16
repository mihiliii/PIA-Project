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

export default authenticationRouter;