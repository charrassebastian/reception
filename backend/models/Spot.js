const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let spotSchema = new Schema({
    name: String,
    available: Boolean
})
module.exports = mongoose.model('spots', spotSchema);
