const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let answerSchema = new Schema({
    id: {
        type: Number
    },
    text: {
        type: String
    },
    isCorrect: {
        type: Boolean
    }
}, {
        collection: 'answerCollection'
    }
);
module.exports = mongoose.model('Answer', answerSchema);
