const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const { router } = require('./routes')
require('dotenv').config()
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'client/build')))
app.use(router)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
})
module.exports.app = app
