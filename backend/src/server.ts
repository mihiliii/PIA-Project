import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import loginRouter from './routers/login.router';
import registerRouter from './routers/register.router';

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/projectDB');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongoose database connection success!');
})

const router = express.Router();
router.use('/login', loginRouter);
router.use('/register', registerRouter);

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));