import express from "express";
import { RegisterController } from "../controllers/register.controller";

const registerRouter = express.Router();

registerRouter.route('/registerPacijent').post(
    (request, response) => { new RegisterController().registerPacijent(request, response); }
);

registerRouter.route('/uploadImage').post(
    (request, response) => { new RegisterController().uploadImage(request,response); }
);

registerRouter.route('/getRegisterRequests').get(
    (request, response) => { new RegisterController().getRegisterRequests(request,response); }
);

registerRouter.route('/acceptRegisterRequests').post(
    (request, response) => { new RegisterController().acceptRegisterRequests(request,response); }
);

registerRouter.route('/declineRegisterRequests').post(
    (request, response) => { new RegisterController().declineRegisterRequests(request,response); }
);

export default registerRouter;