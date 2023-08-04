import mongoose from "mongoose";

const Schema = mongoose.Schema;

const pacijentSchema = new Schema({
    korisnickoIme: String,
    lozinka: String,
    ime: String,
    prezime: String,
    adresa: String,
    kontaktTelefon: String,
    email: String
});

export default mongoose.model('PacijentDB', pacijentSchema, 'pacijenti');