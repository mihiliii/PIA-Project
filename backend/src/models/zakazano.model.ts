import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const zakazanoSchema = new Schema({
    lekar: ObjectId,
    pregled: {
        naziv: String,
        trajanje: Number,
        cena: Number
    },
    datum: String,
    vreme: String
});

export default mongoose.model('ZakazanoDB', zakazanoSchema, 'zakazano');