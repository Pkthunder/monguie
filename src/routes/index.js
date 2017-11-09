const express = require('express');

const mainRouter = express.Router();

// GET home page
mainRouter.get('/', (req, res, next) => {
    res.render('index');
});

module.exports = mainRouter;