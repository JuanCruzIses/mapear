let path = require('path');
const fetch = require('node-fetch');

const db = require('../database/models')
const sequelize = db.sequelize
const { Op } = require("sequelize");


const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { localsName } = require('ejs');

const userController = {
    registerVista : (req, res) => {
        res.render('register');
    },

    registerProcess : async (req, res) => {
        let FinalValidationResult = validationResult(req)
        let userInDB = await db.Usuario.findOne({where: {usuarioEmail : {[Op.like] : req.body.userEmail} } })

        if (!FinalValidationResult.errors.length && !userInDB && req.body.userPassword === req.body.confirmUserPassword ) {
            db.Usuario.create({
                usuarioNombre : req.body.userName,
                usuarioEmail : req.body.userEmail,
                usuarioContrasenia : bcrypt.hashSync(req.body.userPassword, 12), 
                usuarioRolId: 2,
            }).then(function(){
                res.redirect('/')
            })
    }  
    else {       
        if (userInDB){
            return res.render('register', {errores: [{msg: 'Este email ya se encuentra registrado'}], old : req.body })
        }
        if (req.body.userPassword != req.body.confirmUserPassword){
            return res.render('register', {errores: [{msg: 'Las contraseñas no coinciden'}], old : req.body })
        }
        else {        
            return res.render ("register", { errores : FinalValidationResult.array(), old : req.body })
            }
        }
    },

    loginVista : (req, res) => {
            let errores = undefined;
            res.render('login', {errores})
    },

    loginProcess : async (req, res) => {
        try{

            let userPasswordDB = '';
            let usuarioEncontrado = await db.Usuario.findOne({where: {usuarioEmail : {[Op.like] : req.body.userLogin} }})
            if(usuarioEncontrado){
                userPasswordDB = usuarioEncontrado.usuarioContrasenia
            }
            delete usuarioEncontrado.password
            
            let verificaContraseñaHash = bcrypt.compareSync(req.body.passwordLogin, userPasswordDB)
            
            if (usuarioEncontrado && verificaContraseñaHash){
                req.session.usuarioLogeado = usuarioEncontrado
                delete req.session.usuarioLogeado.usuarioContrasenia
                res.redirect("/home")
                
            } else {
                let infoUsuario = null
                let errores = 'Por favor verifique ingresar correctamente sus datos'
                return res.render('login', {errores} ) 
            }
        } catch(error){
            let infoUsuario = null
            let errores = 'Por favor verifique ingresar correctamente sus datos'
            return res.render('login', {errores} )         }
    }, 
    profileVista : (req, res) => {
        res.render('profile')
    },

    profileEdit : async (req, res) => {
        let userInDB = await db.Usuario.findOne({where: {usuarioEmail : {[Op.like] : locals.usuarioLogeado.usuarioNombre} }})
    },

    logout : (req, res) => {
        delete req.session.usuarioLogeado;
        return res.redirect("/")
    }, 
    favoriteVista : async (req, res)=>{
        idDeViaje = req.params.id


        res.render('favorites', {idDeViaje, provincia : req.session.sessionProvincia})
    }
}
module.exports = userController