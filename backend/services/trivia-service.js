const mongoose = require('mongoose')
const Trivia = require('../models/Trivia')

module.exports.store = async ({ question, explanation, answers }) => {
    const trivia = new Trivia({
        question,
        explanation,
        answers
    })
    await trivia.save()
    return trivia
}

module.exports.getAll = async () => {
    const triviaCollection = await Trivia.find({})
    return triviaCollection
}
