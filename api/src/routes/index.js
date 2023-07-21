const { Router } = require('express');
// Importar todos los routers;
const breedsRouter = require('./breedsRouter.js');
const tempsRouter = require('./tempsRouter.js');
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/breeds', breedsRouter);
router.use('/temperaments', tempsRouter);

module.exports = router;
