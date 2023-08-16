import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const pacijentSchema = new Schema({
    // _id: ObjectId,
    korisnickoIme: String,
    lozinka: String,
    ime: String,
    prezime: String,
    adresa: String,
    kontaktTelefon: String,
    email: String,
    image: String,
    status: String
});

export default mongoose.model('PacijentDB', pacijentSchema, 'pacijenti');