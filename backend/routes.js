const express = require('express')
const { createSpot, getSpots, deleteSpotById, updateSpot } = require('./controllers/spot-controller')
const { createTrivia, getAllTrivia, deleteTriviaById } = require('./controllers/trivia-controller')
const router = express.Router()

router.post('/spots', createSpot)
router.get('/spots', getSpots)
router.post('/trivia', createTrivia)
router.get('/trivia', getAllTrivia)
router.delete('/spots/:id', deleteSpotById)
router.delete('/trivia/:id', deleteTriviaById)
router.put('/spots/:id', updateSpot)

module.exports.router = router
