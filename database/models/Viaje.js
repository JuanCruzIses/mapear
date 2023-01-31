module.exports = (sequelize, dataTypes) => {
    let alias = "Viaje";

    let cols = {
        viajeId : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            notNull: true,
        },
        viajeProvinciaId : {
            type: dataTypes.INTEGER,
            notNull: true,
            references: {
                model: 'Provincia',
                key: 'provinciaId'}
        },
        viajeUsuarioId : {
            type: dataTypes.INTEGER,
            notNull: true,
            references: {
                model: 'Usuario',
                key: 'usuarioId'}
        },
        viajeNombre: {
            type: dataTypes.STRING(50),
            notNull: true
        },
        viajeFechaInicio: {
            type: dataTypes.DATE,
            notNull: true,
        }, 
        viajeFechaFinal: {
            type: dataTypes.DATE,
            notNull: true,
        },
        viajeCantidadDias : {
            type: dataTypes.INTEGER,
            notNull: true
        }
    };

    let config = {
        tablename: "viajes",
        timestamps: false, 
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const Viaje = sequelize.define(alias, cols, config)

    Viaje.associate = function(models){
        Viaje.belongsTo(models.Provincia, {
            as:'viaje',
            foreignKey:"viajeProvinciaId"     
        })
    }
    
    Viaje.associate = function(models){
        Viaje.belongsTo(models.Usuario, {
            as:'viaje',
            foreignKey:"viajeUsuarioId"     
        })
    }

    Viaje.associate = function(models){
        Viaje.belongsTo(models.ViajeActividades, {
            as:'viaje',
            foreignKey:"viajeId"     
        })
    }

    return Viaje
}