module.exports = (sequelize, dataTypes) => {
    let alias = "ViajeActividades";

    let cols = {
        viajeActividadId : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            notNull: true,
        },
        actividadId: {
            type: dataTypes.INTEGER,
            references: {
                model: 'Actividades',
                key: 'actividadId'}
        },
        viajeActividadDia: {
            type: dataTypes.INTEGER
        },
        viajeId: {
            type: dataTypes.INTEGER,
            references: {
                model: 'Viaje',
                key: 'viajeId'}
        }
    };

    let config = {
        tablename: "viajeActividades",
        timestamps: false, 
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const ViajeActividades = sequelize.define(alias, cols, config)

    ViajeActividades.associate = function(models){
        ViajeActividades.belongsTo(models.Viaje, {
            as:'viajeActividades',
            foreignKey:"viajeId"     
        })
    }

    ViajeActividades.associate = function(models){
        ViajeActividades.belongsTo(models.Actividades, {
            as:'viajeActividades',
            foreignKey:"actividadId"     
        })
    }

    return ViajeActividades
}