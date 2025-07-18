const appointmentStatus = (sequelize, type) => {
    return sequelize.define('appointmentStatus', {
        idStatus: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'ID único del estado'
        },
        status: {
            type: type.STRING(50),
            allowNull: false,
            comment: 'Estado actual de la cita'
        },
        changedBy: {
            type: type.INTEGER,
            allowNull: false,
            comment: 'ID del usuario que modificó el estado (relación con users)'
        }
    }, {
        timestamps: true,
        comment: 'Historial de estados de una cita'
    });
};
module.exports = appointmentStatus;