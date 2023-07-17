const express = require('express')
const app = express()
const { router } = require('./routes')
require('dotenv').config()
app.use(express.json())
app.use(router)
module.exports.app = app
