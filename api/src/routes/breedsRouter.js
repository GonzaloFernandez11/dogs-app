const { Router } = require('express');

const { getBreeds, getBreedById, postBreed, probar } = require('../handlers/breedsHandler.js');

const breedsRouter = Router();

breedsRouter.get('/', getBreeds);
breedsRouter.get('/:id', getBreedById);
breedsRouter.post('/', postBreed);

module.exports = breedsRouter;