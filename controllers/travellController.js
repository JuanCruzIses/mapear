const db = require('../database/models')
const sequelize = db.sequelize
const { Op } = require("sequelize");
const { all } = require('../routes/travellRoutes');

const travellController = {
    provinceVista: async (req, res) => {
        const id = req.params.id;
        // const lugares = await db.Lugare.findOne({
        //     where: {
        //         lugarProvinciaId : id
        //     }
        // })
        let provincias = await db.Provincia.findByPk(req.params.id);
        await db.Actividades.findAll({
            where: {
                actividadProvinciaId: id
            }
        }).then(function(actividades) {
            console.log(actividades)
            res.render('province', { provincia: provincias, lugares: actividades });
        })
    },

    travellVista: async (req, res) => {
        let usuarioId = res.locals.usuarioLogeado.usuarioId;
        let viajeCreado
        let viajeCreado2 = []

        await db.ViajeUsuarios.findAll({
            where: { usuarioId: usuarioId }
        }).then((response) => {
            if (response.length) {
                response.forEach(viaje => {
                    db.Viaje.findOne({
                        where: { viajeId: viaje.viajeId }
                    }).then((response) => {
                        viajeCreado2.push(response.dataValues)
                    })
                })
            }
        })
        
        console.log(viajeCreado2)
        await db.Viaje.findAll({
            where: { viajeUsuarioId: usuarioId }
        }).then((response) => {
            viajeCreado = Object.values(response)
        })

        if (viajeCreado.length) {
            var fechaI = viajeCreado[0].viajeFechaInicio;
            var fechaInicio = fechaI.split(" ")[0].split("-").reverse().join("-");
            var fechaF = viajeCreado[0].viajeFechaFinal;
            var fechaFinal = fechaF.split(" ")[0].split("-").reverse().join("-");
        }

        req.session.sessionViajeCreado = viajeCreado
        res.render('travells', { viajeCreado2, viajeCreado, provincia: req.session.sessionProvincia, fechaInicio, fechaFinal })
    },

    travellCreate: async (req, res) => {
        let usuarioId = res.locals.usuarioLogeado.usuarioId


        db.Viaje.create({
            viajeProvinciaId: req.body.destinyEvent,
            viajeUsuarioId: usuarioId,
            viajeNombre: req.body.nameEvent,
            viajeFechaInicio: req.body.initialDateTravell,
            viajeFechaFinal: req.body.finalDateTravell,
            viajeCantidadDias: req.body.quantityDaysEvent,
        }).then(() => res.redirect('/travell'))
    },

    travellDelete: (req, res) => {
        let viajeId = req.body.viajeId;

        Promise.all([
            db.Gastos.destroy({ where: { viajeId: viajeId } }),
            db.ViajeUsuarios.destroy({ where: { viajeId: viajeId } }),
            db.ViajeActividades.destroy({ where: { viajeId: viajeId }}),
            db.Viaje.destroy({ where: { viajeId: viajeId } })
        ]).then(function(){
            res.redirect('/travell')
        })
    },

    itinerarioVista: async (req, res) => {
        let idDeViaje = req.params.id
        let provincia = req.session.sessionProvincia;
        let errorAddUserInTheTravel

        let viajeCreado = await db.Viaje.findByPk(idDeViaje)
        let provinciaId = viajeCreado.viajeProvinciaId
        let actividadesEnProvincia = await db.Actividades.findAll({
            where: { actividadProvinciaId: provinciaId }
        })
        let itinerarioViaje = await db.ViajeActividades.findAll({
            where: { viajeId: idDeViaje }
        })

        
        //--RENDERIZAR MSG ERROR ADD USER IN THE TRAVEL(INCOOMPLETO!) --//
        if (errorAddUserInTheTravel == req.session.errorAddUserInTheTravel) {
            errorAddUserInTheTravel = null
        } else {
            errorAddUserInTheTravel = req.session.errorAddUserInTheTravel
        }
        //---------------  -----------------//

        let itinerarioDias = [];
        itinerarioViaje.forEach(itinerario => {
            itinerarioDias.push(itinerario)
        })

        let arrayActividades = []
        itinerarioViaje.forEach(itinerario => {
            actividadesEnProvincia.forEach(actividades => {
                if (actividades.actividadId == itinerario.actividadId) {
                    arrayActividades.push({ actividadNombre: actividades.actividadNombre, actividadDia: itinerario.viajeActividadDia, actividadId:itinerario.viajeActividadId })
                }
            })
        })

        if (viajeCreado != undefined) {
            var fechaI = viajeCreado.viajeFechaInicio;
            var fechaInicio = fechaI.split(" ")[0].split("-").reverse().join("-");
            var fechaF = viajeCreado.viajeFechaFinal;
            var fechaFinal = fechaF.split(" ")[0].split("-").reverse().join("-");
        }

        let msgUserAddFailed
        if (req.cookies.userAddedFailed != undefined) {
            msgUserAddFailed = req.cookies.userAddedFailed
        }
        let msgUserAddSucces
        if (req.cookies.userAddedSucces != undefined) {
            msgUserAddSucces = req.cookies.userAddedSucces
        }

        res.render('travellsDetail', { viajeCreado, provincia, actividadesEnProvincia, errorAddUserInTheTravel, idDeViaje, fechaInicio, fechaFinal, arrayActividades, msgUserAddFailed, msgUserAddSucces })
    },

    addActivityItinerario: async (req, res) => {
        try {
        let idDeViaje = req.params.id
        db.ViajeActividades.create({
            actividadId: req.body.activityEvent,
            viajeActividadDia: req.body.numberDay,
            viajeId: idDeViaje,
        }).then(function () {
            res.redirect('/travell/itinerario/' + idDeViaje)
        })
        } catch (error) {
                console.log(error)
        }
    },
    deleteActivityItinerario: async(req, res)=>{
            let idDeViaje = req.params.id
            db.ViajeActividades.destroy({
                where : { viajeActividadId : req.body.idActivityDelete }
            }).then(function(){
                res.redirect('/travell/itinerario/' + idDeViaje)
            })
    },

    contadorVista: async (req, res) => {
        let usuarioId = res.locals.usuarioLogeado.usuarioId
        let usuariosFind = []
        let arrayUsuarios = []
        let idDeViaje = req.params.id

        await db.ViajeUsuarios.findAll({ where: { viajeId: idDeViaje } })
            .then((response)=>{
                response.forEach(usuario=>{
                    usuariosFind.push(usuario.usuarioId)
                })
            })
            
        await db.Viaje.findOne({ where: { viajeId: idDeViaje } })
            .then((response) => {
                usuariosFind.push(response.viajeUsuarioId)
            })
        
        usuariosFind.forEach(element=>{
            db.Usuario.findByPk(element)
            .then((response)=>{
                arrayUsuarios.push(response.dataValues)
                console.log(arrayUsuarios)
            })
        })
        
        let gastos = await db.Gastos.findAll({ where: { viajeId: idDeViaje } })
        let arrayGastos = gastos

        res.render('contador', { idDeViaje, usuarioId, arrayGastos, arrayUsuarios })
    },

    contadorProcess: async (req, res) => {
        let usuarioId = res.locals.usuarioLogeado.usuarioId
        let idDeViaje = req.params.id

        db.Gastos.create({
            usuarioId: usuarioId,
            gastoNombre: req.body.nameSpent,
            gastoDescripcion: req.body.detailSpent,
            gastoPrecio: req.body.quantitySpent,
            viajeId: idDeViaje
        })
            .then(function () {
                res.redirect('/travell/itinerario/' + idDeViaje + '/contador')
            })
    },

    addUserTravell: async (req, res) => {
        let userForAdd = await db.Usuario.findOne({
            where: { usuarioEmail: req.body.userEmail }
        })

        let valor
        let usersInTheTravell = await db.ViajeUsuarios.findAll({
            where: { viajeId: req.params.id }
        }).then((response) => {
            for (let i = 0; i < response.length; i++) {
                if (userForAdd && userForAdd.usuarioId == response[i].dataValues.usuarioId) {
                    return valor = true
                }
            }
        })
        if (userForAdd != undefined && (valor != true)) {
            let msg = 'Usuario agregado correctamente';
            res.cookie('userAddedSucces', msg, { maxAge: 2000 })
            db.ViajeUsuarios.create({
                viajeId: req.params.id,
                usuarioId: userForAdd.usuarioId
            })
                .then(function () {
                    res.redirect('/travell/itinerario/' + req.params.id)
                })

        } else {

            if (userForAdd == undefined) {
                let msg = 'Por favor verifique ingresar correctamente el email de la cuenta'
                res.cookie('userAddedFailed', msg, { maxAge: 2000 })
                return res.redirect('/travell/itinerario/' + req.params.id)
            }

            if (valor == true) {
                let msg = 'El usuario ya fue agregado al evento de viaje'
                res.cookie('userAddedFailed', msg, { maxAge: 2000 })
                return res.redirect('/travell/itinerario/' + req.params.id)
            }
        }
    },
    travellEdit : async (req, res)=>{
        let viaje
        await db.Viaje.findByPk(req.params.id)
        .then((response)=>{
            viaje = response.dataValues
        })

        let viajeUsuarios
        await db.ViajeUsuarios.findAll({
            where: {viajeId : req.params.id}
        }).then((response)=>{
            viajeUsuarios = response.dataValues
        })

        console.log(viaje)
        console.log(viajeUsuarios)
        res.render('travellEdit', {viaje, viajeUsuarios})
    }
}

module.exports = travellController;