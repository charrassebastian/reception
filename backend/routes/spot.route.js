//basado en https://www.positronx.io/react-mern-stack-crud-app-tutorial/

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const spotSchema = require('../models/Spot');
router.route('/spot').post((req, res, next) => {
    spotSchema.create(req.body, (error, data) => {
        if (error){
            return next(error);
        } else {
            console.log(data);
            res.json(data);
        }
    })
})
router.route('/spots').get((req, res) => {
    spotSchema.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

router.route('/spot/:id').delete((req, res, next) => {
    spotSchema.findByIdAndDelete(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            req.status(200).json({msg: data})
        }
    })
})
module.exports = router;
