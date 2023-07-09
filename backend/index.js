// basado inicialmente en https://www.positronx.io/react-mern-stack-crud-app-tutorial/

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const spotRoute = require('../routes/spot.route');
mongoose.connect('mongodb://127.0.0.1:27017/sirhc')
        .then(x => console.log('Conectado a base de datos con nombre: "' +  x.connections[0].name + '"'))
        .catch(errr => console.error('Error conectando a base de datos', err.reason));
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());
app.use('/spots', spotRoute);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => console.log('Conectado a puerto ' + port));
app.use((req, res, next) => next(createError(404)));
app.use((err, req, res, next) => {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
