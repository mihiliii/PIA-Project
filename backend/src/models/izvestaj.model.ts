import mongoose from "mongoose";

const Schema = mongoose.Schema;

const izvestajSchema = new Schema({
    // _id: ObjectId,
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
    razlogDolaska: String,
    dijagnoza: String,
    terapija: String,
    datumSledecegPregleda: String
});


export default mongoose.model('izvestajDB', izvestajSchema, 'izvestaji');