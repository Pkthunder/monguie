const express = require('express');
const sample = require('../utils/sample-data.json');

const mainRouter = express.Router();

// GET home page
mainRouter.get('/', (req, res, next) => {
    res.render('index');
});

mainRouter.get('/sample', (req, res, next) => {
    res.json(sample);
});

module.exports = mainRouter;