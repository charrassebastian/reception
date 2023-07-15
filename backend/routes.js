const express = require('express')
const { createSpot, getSpots } = require('./controllers/spot-controller')
const { createTrivia, getAllTrivia } = require('./controllers/trivia-controller')
const router = express.Router()

router.post('/spots', createSpot)
router.get('/spots', getSpots)
router.post('/trivia', createTrivia)
router.get('/trivia', getAllTrivia)

module.exports.router = router
