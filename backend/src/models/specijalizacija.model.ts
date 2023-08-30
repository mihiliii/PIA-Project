import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const specijalizacijaSchema = new Schema({
    naziv: String
});

export default mongoose.model('specijalizacijaDB', specijalizacijaSchema, 'specijalizacije');