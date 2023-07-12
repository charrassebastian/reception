//realizado basandose primeramente en https://developero.io/blog/node-tdd-example
const { app } = require('./app')
const port = 8090

if (require.main === module) {
    app.listen(() => console.log('Listening on port ' + port))
}

module.exports.app = app
