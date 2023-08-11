import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const terminSchema = new Schema({
    pregled: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PregledDB'
    },
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

export default mongoose.model('TerminiDB', terminSchema, 'termini');