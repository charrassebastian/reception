const mongoose = require('mongoose');
let triviaSchema = new Schema({
    question: String,
    explanation: String,
    answers: Array
});
module.exports = mongoose.model('trivia', triviaSchema);
