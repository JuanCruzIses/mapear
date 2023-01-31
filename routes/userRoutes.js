const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const registerValidation = require("../middlewares/registerValidation")
const loggedMiddlewares = require('../middlewares/loggedMiddlewares');
const notLoggedMiddlewares = require('../middlewares/notLoggedMiddlewares');

//LOGIN//
router.get('/', loggedMiddlewares, userController.loginVista);
router.post('/', userController.loginProcess);

//REGISTER//
router.get('/register', loggedMiddlewares, userController.registerVista);
router.post('/register', registerValidation, userController.registerProcess)

//PROFILE + EDIT PROFILE//
router.get('/profile/:id', notLoggedMiddlewares, userController.profileVista);
router.put('/profile/:id', userController.profileEdit)

//FAVORITE
router.get('/favorites/:id', notLoggedMiddlewares, userController.favoriteVista)

//LOGOUT //
router.get('/logout', userController.logout)

module.exports = router;