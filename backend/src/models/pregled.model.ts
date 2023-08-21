import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const pregledSchema = new Schema({
    // _id: ObjectId,
    naziv: String,
    trajanje: Number,
    cena: String,
    specijalizacija: String,
    status: String
});

export default mongoose.model('PregledDB', pregledSchema, 'pregledi');