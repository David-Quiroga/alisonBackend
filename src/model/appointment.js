const appointment = (sequelize, type) => {
    return sequelize.define('appointments', {
        idAppointment: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'ID único de la cita'
        },
        date: {
            type: type.DATE,
            allowNull: false,
            comment: 'Fecha y hora de la cita'
        },
        reason: {
            type: type.STRING(500),
            allowNull: false,
            comment: 'Motivo de la consulta (ej: "Vacuna anual")'
        },
        petId: {
            type: type.INTEGER,
            allowNull: false,
            comment: 'ID de la mascota (relación con pets)'
        },
        vetId: {
            type: type.INTEGER,
            allowNull: false,
            comment: 'ID del veterinario (relación con vets)'
        },
        notes: {
            type: type.TEXT,
            comment: 'Observaciones adicionales'
        }
    }, {
        timestamps: true,  // Crea createdAt y updatedAt automáticamente
        comment: 'Tabla principal de citas veterinarias'
    });
};
module.exports = appointment;