let path = require('path');
const fetch = require('node-fetch');

const db = require('../database/models')
const sequelize = db.sequelize
const { Op } = require("sequelize");

const indexController = {
    indexVista : async (req, res) => {
        const provincias = await db.Provincia.findAll()
            .then(function(provincias){
                req.session.sessionProvincia = provincias
                res.render ('index', {provincias});
        })
    },
    searchProcess: async (req, res)=>{
        let provinceSearch = req.query.destino
        let provinces = [] 
        await db.Provincia.findOne({
            where : {
                provinciaNombre : { [Op.like] : '%' + provinceSearch + '%'}
            }
        }).then((response)=>{
            console.log(response)
            provinces = response
             res.redirect ('/travell/province/' + response.provinciaId);
        })
    }
}

module.exports = indexController;