const mongoose = require('mongoose')

let spotSchema = new mongoose.Schema({
    name: String,
    available: Boolean
})

const Spot = mongoose.model('spots', spotSchema)

module.exports.store = async ({ name, available }) => {
    const spot = new Spot({
        name,
        available
    })
    await spot.save()
    return spot
}

module.exports.store = async () => { }