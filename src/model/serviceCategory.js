const serviceCategory = (sequelize, type) => {
    return sequelize.define('serviceCategory', {
        idServiceCategory: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'ID único de la categoría del servicio'
        },
        nameServiceCategory: {
            type: type.STRING(100),
            allowNull: false,
            comment: 'Nombre de la categoría del servicio'
        },
        descriptionServiceCategory: {
            type: type.TEXT,
            allowNull: true,
            comment: 'Descripción de la categoría del servicio'
        }
    }, {
        timestamps: true,  // Crea createdAt y updatedAt automáticamente
        comment: 'Tabla de categorías de servicios ofrecidos por la veterinaria'
    });
}
module.exports = serviceCategory;