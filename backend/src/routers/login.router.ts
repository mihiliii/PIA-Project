import express from 'express';
import { LoginController } from '../controllers/login.controller';

const loginRouter = express.Router();

loginRouter.route('/login').post(
    (request, response) => { new LoginController().login(request, response);}
)

export default loginRouter;