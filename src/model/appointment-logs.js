const appointmentLogs = (sequelize, type) => {
    return sequelize.define('appointmentLogs', {
        idLog: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'ID único del registro'
        },
        action: {
            type: type.STRING(100),
            allowNull: false,
            comment: 'Acción registrada (ej: "status_updated", "diagnosis_added")'
        },
        details: {
            type: type.TEXT,
            comment: 'Detalles en JSON (ej: cambios en estado, diagnóstico)'
        },
        createdBy: {
            type: type.INTEGER,
            allowNull: false,
            comment: 'ID del usuario que realizó la acción (relación con users)'
        }
    }, {
        timestamps: true,
        comment: 'Auditoría de actividades relacionadas a una cita'
    });
};
module.exports = appointmentLogs;