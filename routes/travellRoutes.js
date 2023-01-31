const express = require('express');
const router = express.Router();
const travellController = require('../controllers/travellController');
const notLoggedMiddlewares = require('../middlewares/notLoggedMiddlewares');

router.get('/province/:id', notLoggedMiddlewares, travellController.provinceVista);

router.get('/', notLoggedMiddlewares, travellController.travellVista)
router.post('/', travellController.travellCreate)
router.delete('/', travellController.travellDelete)

router.get('/itinerario/:id', notLoggedMiddlewares, travellController.itinerarioVista)
router.post('/itinerario/:id', travellController.addActivityItinerario)
router.delete('/itinerario/:id', travellController.deleteActivityItinerario)
router.post('/itinerario/:id/addUsers', travellController.addUserTravell)

router.get('/itinerario/:id/contador', notLoggedMiddlewares, travellController.contadorVista)
router.post('/itinerario/:id/contador', notLoggedMiddlewares, travellController.contadorProcess)

router.get('/edit/:id', notLoggedMiddlewares, travellController.travellEdit)

module.exports = router;