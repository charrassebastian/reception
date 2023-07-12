const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let triviaSchema = new Schema({
    id: {
        type: Number
    },
    question: {
        type: String
    },
    explanation: {
        type: String
    },
    answers: {
        type: Array
    }
}, {
        collection: 'triviaCollection'
    }
);
module.exports = mongoose.model('Trivia', triviaSchema);
