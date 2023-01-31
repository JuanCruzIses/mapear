const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const multer = require('multer');
const path = require('path');
const adminMiddlewares = require("../middlewares/adminMiddlewares")

// ************ MiddleWares Require ************
const lugaresMulter = require('../middlewares/lugaresMulter');

// ************ CREATE *************
router.get('/', adminMiddlewares, adminController.adminVista);
router.post('/', lugaresMulter.single('img'), adminController.create); 
// ************ CREATE *************


module.exports = router;