const { store, getAll, deleteById } = require('../services/spot-service')

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
    res.status(200).json(spots)
}

module.exports.deleteSpotById = async (req, res) => {
    const id = req.params.id
    const spot = await deleteById(id)

    if (!spot) res.status(404).json()
    
    res.status(200).json(spot)
}