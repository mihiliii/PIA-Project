import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { pregledSchema } from './pregled.model';

const Schema = mongoose.Schema;

const zakazaniPregledSchema = new Schema({
    pregled: pregledSchema,
    lekar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LekarDB'
    },
    pacijent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PacijentDB'
    },
    datum: String,
    vreme: String,
    trajanje: Number
});

export default mongoose.model('zakazaniPreglediDB', zakazaniPregledSchema, 'zakazaniPregledi');