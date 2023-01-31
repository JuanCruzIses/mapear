module.exports = (sequelize, dataTypes) => {
    let alias = "Gastos";

    let cols = {
        gastosId : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
        },
        gastoNombre: {
            type: dataTypes.STRING(40)
        },
        gastoDescripcion: {
            type: dataTypes.STRING(80)
        },
        gastoPrecio: {
            type: dataTypes.INTEGER
        },
        usuarioId: {
            type: dataTypes.INTEGER,
            references: {
                model: 'Usuario',
                key: 'usuarioId'}
        },
        viajeId: {
            type: dataTypes.INTEGER,
            references: {
                model: 'Viaje',
                key: 'viajeId'}
        },
        
    };

    let config = {
        tablename: "gastos",
        timestamps: false, 
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const Gastos = sequelize.define(alias, cols, config)

    Gastos.associate = function(models){
        Gastos.belongsTo(models.Viaje, {
            as:'gastos',
            foreignKey:"viajeId"     
        })
    }

    Gastos.associate = function(models){
        Gastos.belongsTo(models.Usuario, {
            as:'gastos',
            foreignKey:"usuarioId"     
        })
    }

    return Gastos
}