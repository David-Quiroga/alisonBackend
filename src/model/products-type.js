const productsType = (sequelize, type) => {
    return sequelize.define('productsType', {
        idProductType: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'ID único del tipo de producto'
        },
        productId: {
            type: type.INTEGER,
            allowNull: false,
            comment: 'ID del producto (relación con products)'
        },
        petId: {
            type: type.INTEGER,
            allowNull: false,
            comment: 'ID de la mascota (relación con pets)'
        }
    }, {
        timestamps: true,  // Crea createdAt y updatedAt automáticamente
        comment: 'Tabla de tipos de productos disponibles en la veterinaria'
    });
}
module.exports = productsType;