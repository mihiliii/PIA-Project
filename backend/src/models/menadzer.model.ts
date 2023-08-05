import mongoose from "mongoose";

const Schema = mongoose.Schema;

const menadzerSchema = new Schema({
    korisnickoIme: String,
    lozinka: String,
});

export default mongoose.model('MenadzerDB', menadzerSchema, 'menadzeri');