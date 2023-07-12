const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let answerSchema = new Schema({
    text: String,
    isCorrect: Boolean
});
module.exports = mongoose.model('answers', answerSchema);
