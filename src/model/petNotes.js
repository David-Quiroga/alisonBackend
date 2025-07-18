const petNotes = (sequelize, type) => {
    return sequelize.define('petNotes', {
        idPetNote: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            Comment: 'campo unico de notas de mascotas'
        },
        noteContent: {
            type: type.STRING,
            Comment: 'contenido de la nota de la mascota'
        },
        observations: {
            type: type.STRING,
            allowNull: true,
            Comment: 'observaciones adicionales sobre la mascota'
        },
        diagnistic: {
            type: type.STRING,
            allowNull: true,
            Comment: 'diagnóstico de la mascota'
        },
        treatment: {
            type: type.STRING,
            allowNull: true,
            Comment: 'tratamiento recomendado para la mascota'
        },
        medicine: {
            type: type.STRING,
            allowNull: true,
            Comment: 'medicamento prescrito para la mascota'
        },
        nextVisit: {
            type: type.DATE,
            allowNull: true,
            Comment: 'fecha de la próxima visita o seguimiento'
        },
        petId: {
            type: type.INTEGER,
            allowNull: false,
            Comment: 'id de la mascota a la que pertenece la nota'
        },
        createdAt: {
            type: type.DATE,
            defaultValue: type.NOW,
            Comment: 'fecha de creación de la nota'
        }
    }, {
        timestamps: false,
        comment: 'Tabla de notas de mascotas',
    });
}
module.exports = petNotes;