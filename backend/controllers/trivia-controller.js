const { store, getAll } = require('../services/trivia-service')

module.exports.createTrivia = async (req, res) => {
    const { question, explanation, answers } = req.body
    const _id = '1'
    await store({question, explanation, answers})
    res.status(201).json({
        question,
        explanation,
        answers,
        _id
    })
}

module.exports.getAllTrivia = async (req, res) => {
    const trivia = await getAll()
    res.status(200).json(trivia)
}
