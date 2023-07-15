const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let triviaSchema = new Schema({
    question: String,
    explanation: String,
    answers: Array
});
module.exports = mongoose.model('trivia', triviaSchema);
