module.exports = (sequelize, dataTypes) => {
    let alias = "ViajeUsuarios";

    let cols = {
        viajeusuarioId : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            notNull: true,
        },
        viajeId: {
            type: dataTypes.INTEGER,
            references: {
                model: 'Viaje',
                key: 'viajeId'}
        },
        usuarioId: {
            type: dataTypes.INTEGER,
            references: {
                model: 'Usuario',
                key: 'usuarioId'}
        }
    };

    let config = {
        tablename: "viajeusuarios",
        timestamps: false, 
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const ViajeUsuarios = sequelize.define(alias, cols, config)

    ViajeUsuarios.associate = function(models){
        ViajeUsuarios.belongsTo(models.Viaje, {
            as:'viajeusuarios',
            foreignKey:"viajeId"     
        })
    }

    ViajeUsuarios.associate = function(models){
        ViajeUsuarios.belongsTo(models.Usuario, {
            as:'viajeusuarios',
            foreignKey:"usuarioId"     
        })
    }

    return ViajeUsuarios
}