module.exports = (sequelize, dataTypes) => {
    let alias = "Usuario";

    let cols = {
        usuarioId: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            notNull: true
        },
        usuarioNombre: {
            type: dataTypes.STRING(30),
        },
        usuarioEmail: {
            type: dataTypes.STRING(50),
        },
        usuarioContrasenia: {
            type: dataTypes.STRING(70),
        },
        usuarioRolId: {
            type: dataTypes.INTEGER
        }
    };

    let config = {
        tableName: "usuarios",
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at'

    };

    const Usuario = sequelize.define(alias, cols, config)
    return Usuario
}

