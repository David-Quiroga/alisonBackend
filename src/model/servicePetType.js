const servicePetType = (sequelize, type) => {
    return sequelize.define('servicePetType', {
        idServicePetType: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'ID único de la relación entre servicio y tipo de mascota'
        },
        service_id: {
            type: type.INTEGER,
            allowNull: false,
            comment: 'ID del servicio relacionado'
        },
        pet_type_id: {
            type: type.INTEGER,
            allowNull: false,
            comment: 'ID del tipo de mascota relacionado'
        },
        observations: {
            type: type.STRING(255),
            allowNull: true,
            comment: 'Observaciones adicionales sobre la relación entre servicio y tipo de mascota'
        }
    },{
        timestamps: true,  // Crea createdAt y updatedAt automáticamente
        comment: 'Tabla que relaciona servicios con tipos de mascotas'
    });
}
module.exports = servicePetType;