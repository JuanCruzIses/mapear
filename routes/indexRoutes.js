const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const notLoggedMiddlewares = require('../middlewares/notLoggedMiddlewares');

router.get('/', notLoggedMiddlewares, indexController.indexVista);
router.get('/find', notLoggedMiddlewares, indexController.searchProcess)

module.exports = router;