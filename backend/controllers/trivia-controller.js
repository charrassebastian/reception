const { store, getAll, deleteById, update } = require('../services/trivia-service')

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

module.exports.deleteTriviaById = async (req, res) => {
    const id = req.params.id
    const trivia = await deleteById(id)
    if (!trivia) res.status(404).json()
    res.status(200).json(trivia)
}

module.exports.updateTrivia = async (req, res) => {
    const updatedTrivia = await update(req.params.id, req.body)
    if (!updatedTrivia) res.status(404).json()
    res.status(200).json(updatedTrivia)
}
