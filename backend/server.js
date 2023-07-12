const { app } = require('./app')
const port = 8090

if (require.main === module) {
    app.listen(() => console.log('Listening on port ' + port))
}

module.exports.app = app
