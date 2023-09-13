const { app } = require('./app')
const { connect, getUri, closeDb } = require('./db')
const port = process.env.NODE_PORT ?? 8090

const run = async () => {
    const uri = process.env.DB_URI
    await connect({ uri })
}

if (require.main === module) {
    run()
    app.listen(port, () => console.log('Listening on port ' + port))
}

module.exports.app = app
