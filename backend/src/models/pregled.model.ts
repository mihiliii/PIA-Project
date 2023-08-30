import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const pregledSchema = new Schema({
    // _id: ObjectId,
    naziv: String,
    trajanje: Number,
    cena: Number,
    specijalizacija: String,
    status: String
});

export default mongoose.model('PregledDB', pregledSchema, 'pregledi');