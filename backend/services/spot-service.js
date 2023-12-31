const mongoose = require('mongoose')
const Spot = require('../models/Spot')

module.exports.store = async ({ name, available }) => {
    const spot = new Spot({
        name,
        available
    })
    await spot.save()
    return spot
}

module.exports.getAll = async () => {
    const spots = await Spot.find({})
    return spots
}

module.exports.deleteById = async id => {
    const spot = await Spot.findByIdAndDelete({ _id: id })
    return spot
}

module.exports.update = async (id, spot) => {
    const updatedSpot = await Spot.findByIdAndUpdate(id, spot)
    return updatedSpot
}

module.exports.getById = async id => {
    const spot = await Spot.findById(id)
    return spot
}