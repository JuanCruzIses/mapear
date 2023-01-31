let path = require('path');
const fetch = require('node-fetch');

const db = require('../database/models')
const sequelize = db.sequelize
const { Op } = require("sequelize");


const adminController = {
    adminVista : (req, res) => {
        return res.render('admin');
    }, 
    create : (req, res) => {
            db.Actividades.create({
                actividadProvinciaId : req.body.adminOptions ,   
                actividadNombre : req.body.lugarNombre,
                actividadDescripcion : req.body.lugarDescripcion ,
                actividadImagen : req.file.filename,
        })  .catch(error => console.log(error))
                .then(function(){
                    console.log('Lugar creado');
                    res.redirect('/admin');
                });
}
}

module.exports = adminController;
	
			