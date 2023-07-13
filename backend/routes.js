const express = require('express')
const { createSpot } = require('./controllers/spot-controller')
const router = express.Router()

router.post('/spots', createSpot)

module.exports.router = router