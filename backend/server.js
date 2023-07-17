const { app } = require('./app')
const { connect, getUri, closeDb } = require('./db')
const port = 8090

const run = async () => {
    const user = process.env.DB_USER
    const password = process.env.DB_PASSWORD
    const uri = 'mongodb://' + user + ':' + password + '@127.0.0.1:27017'
    await connect({ uri })
}

if (require.main === module) {
    run()
    app.listen(port, () => console.log('Listening on port ' + port))
}

module.exports.app = app
