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

module.exports.deleteById = async id => {
    const trivia = await Trivia.findByIdAndDelete(id)
    return trivia
}

module.exports.update = async (id, trivia) => {
    const updatedTrivia = await Trivia.findByIdAndUpdate(id, trivia)
    return updatedTrivia
}
