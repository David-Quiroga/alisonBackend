const users = (sequelize, type) => {
    return sequelize.define('users', {
        idUser: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'ID único del usuario'
        },
        nombre: {
            type: type.STRING(50),
            allowNull: false,
            comment: 'Nombre de usuario único'
        },
        apellido: {
            type: type.STRING(50),
            comment: 'Apellido del usuario'
        },
        cedula: {
            type: type.STRING(20),
            allowNull: false,
            comment: 'Cédula de identidad del usuario'
        },
        correo: {
            type: type.STRING(100),
            allowNull: false,
            validate: {
                isEmail: true
            },
            comment: 'Correo electrónico del usuario'
        },
        password: {
            type: type.STRING(255),
            allowNull: false,
            comment: 'Contraseña del usuario, debe ser almacenada de forma segura'
        }
        
    }, {
        timestamps: true,  // Crea createdAt y updatedAt automáticamente
        comment: 'Tabla principal de usuarios del sistema'
    });
}
module.exports = users;