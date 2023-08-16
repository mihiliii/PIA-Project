import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import PregledDB from './pregled.model';

const Schema = mongoose.Schema;

const lekarSchema = new Schema({
    // _id: ObjectId,
    korisnickoIme: String,
    lozinka: String,
    ime: String,
    prezime: String,
    adresa: String,
    kontaktTelefon: String,
    email: String,
    brojLicence: Number,
    specijalizacija: String,
    ogranakOrdinacije: String,
    image: String,
    status: String,
    pregledi: [{type: mongoose.Schema.Types.ObjectId, ref: PregledDB}]
});

export default mongoose.model('LekarDB', lekarSchema, 'lekari');