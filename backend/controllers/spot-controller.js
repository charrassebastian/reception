const { store, getAll } = require('../services/spot-service')

module.exports.createSpot = async (req, res) => {
    const { name, available } = req.body
    const _id = '1'
    await store({name, available})
    res.status(201).json({
        name,
        available,
        _id
    })
}

module.exports.getSpots = async (req, res) => {
    const spots = await getAll()
    res.status(201).json(spots)
}
