import express from "express";
import { RegisterController } from "../controllers/register.controller";

const registerRouter = express.Router();

registerRouter.route('/registerPacijent').post(
    (request, response) => { new RegisterController().registerPacijent(request, response); }
);

registerRouter.route('/registerLekar').post(
    (request, response) => { new RegisterController().registerLekar(request, response); }
)

export default registerRouter;