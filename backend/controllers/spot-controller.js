const { store } = require('../services/spot-service')

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