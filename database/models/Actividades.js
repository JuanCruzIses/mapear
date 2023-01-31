module.exports = (sequelize, dataTypes) => {
    let alias = "Actividades";

    let cols = {
         actividadId : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            notNull: true
        },
        actividadProvinciaId : {
            type: dataTypes.INTEGER,
            references: {
                model: 'Provincia',
                key: 'provinciaId'}
        },
        actividadNombre: {
            type: dataTypes.STRING(50)
        },
        actividadDescripcion: {
            type: dataTypes.TEXT
        }, 
        actividadImagen: {
            type: dataTypes.STRING(150)
        }
    };

    let config = {
        tablename: "actividades",
        timestamps: false, 
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const Actividades = sequelize.define(alias, cols, config)

    Actividades.associate = function(models){
        Actividades.belongsTo(models.Provincia, {
            as:'lugares',
            foreignKey:"actividadProvinciaId"     
        })
    }

    return Actividades
}