import mongoose from "mongoose";

const Schema = mongoose.Schema;

const lekarSchema = new Schema({
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
    status: String
});

export default mongoose.model('LekarDB', lekarSchema, 'lekari');