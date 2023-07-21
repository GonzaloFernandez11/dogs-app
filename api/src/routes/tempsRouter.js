const { Router } = require('express');

const getTemperaments = require('../handlers/temperamentsHandler.js');

const tempsRouter = Router();

tempsRouter.get('/', getTemperaments);

module.exports = tempsRouter;