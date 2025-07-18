const petTypes = (sequelize, type) => {
    return sequelize.define('petTypes', {
        idPetType: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            Comment: 'campo unico de tipos de mascotas'
        },
        typeName: {
            type: type.STRING,
            allowNull: false,
            Comment: 'nombre del tipo de mascota'
        }
    }, {
        timestamps: false,
        comment: 'Tabla de tipos de mascotas',
    });
}
module.exports = petTypes;