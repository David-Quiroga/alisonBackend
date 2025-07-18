const service = (sequelize, type) => {
    return sequelize.define('service', {
        idService: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'ID único del servicio'
        },
        nombreService: {
            type: type.STRING(100),
            allowNull: false,
            comment: 'Nombre del servicio'
        },
        descriptionService: {
            type: type.TEXT,
            allowNull: false,
            comment: 'Descripción del servicio'
        },
        imageService: {
            type: type.STRING(255),
            allowNull: true,
            comment: 'URL de la imagen del servicio'
        },
        priceService: {
            type: type.DECIMAL(10, 2),
            allowNull: false,
            comment: 'Precio del servicio'
        },
        durationService: {
            type: type.INTEGER,
            allowNull: false,
            comment: 'Duración del servicio en minutos'
        }
    }, {
        timestamps: true,  // Crea createdAt y updatedAt automáticamente
        comment: 'Tabla de servicios ofrecidos por la veterinaria'
    });
}
module.exports = service;