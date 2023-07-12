//realizado basandose primeramente en https://developero.io/blog/node-tdd-example
const express = require('express')
const app = express()
const port = 8090
app.use(express.json())

app.post('/spots', (req, res) => {
    const { name, available } = req.body

    const _id = '1'

    res.status(201).json({
        name,
        available,
        _id,
    })
})

if (require.main === module) {
    app.listen(() => console.log('Listening on port ' + port))
}

module.exports.app = app
