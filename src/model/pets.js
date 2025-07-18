const pets = (sequelize, type) => {
    return sequelize.define('pets', {
        idPets: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            Comment: 'campo unico de mascotas'
        },
        namePet: {
            type: type.STRING(50),
            allowNull: false,
            Comment: 'nombre de la mascota'
        },
        razaPet: {
            type: type.STRING(50),
            allowNull: false,
            Comment: 'raza de la mascota'
        },
        edadPet: {
            type: type.INTEGER,
            Comment: 'edad de la mascota en años'
        },
        sexoPet: {
            type: type.ENUM('Macho', 'Hembra', 'Otro'),
            allowNull: false,
            Comment: 'género de la mascota'
        },
        type_id: {
            type: type.INTEGER,
            allowNull: false,
            Comment: 'tipo de mascota'
        },
        user_id: {
            type: type.INTEGER,
            allowNull: false,
            Comment: 'id del propietario de la mascota'
        }
    }, {
        timestamps: true,  // createdAt y updatedAt automáticos
        comment: 'Tabla de mascotas'
    });
};
module.exports = pets;