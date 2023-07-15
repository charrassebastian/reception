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
