const express = require('express')
const { store } = require('./services/spot-service')
const router = express.Router()
const baseSpot = { name: '1', available: false }
router.post('/spots', async (req, res) => {
    const { name, available } = req.body
    const _id = '1'
    await store({ name, available })
    res.status(201).json({
        ...baseSpot,
        _id
    })
})

module.exports.router = router