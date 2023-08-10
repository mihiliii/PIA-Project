import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import pacijentRouter from './routers/pacijent.router';
import lekarRouter from './routers/lekar.router';
import authenticationRouter from './routers/authentication.router';

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/projectDB');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongoose database connection success!');
})

const router = express.Router();
router.use('/authentication', authenticationRouter);
router.use('/pacijent', pacijentRouter);
router.use('/lekar', lekarRouter);

app.use('/', router);
app.use('/images', express.static('./images'));
app.listen(4000, () => console.log(`Express server running on port 4000`));