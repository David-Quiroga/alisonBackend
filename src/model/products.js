const products = (sequelize, type) => { 
    return sequelize.define('products', {
        idProduct: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'ID único del producto'
        },
        nombreProducto: {
            type: type.STRING(100),
            allowNull: false,
            comment: 'Nombre del producto'
        },
        descriptionProduct: {
            type: type.TEXT,
            allowNull: false,
            comment: 'Descripción del producto'
        },
        priceProduct: {
            type: type.DECIMAL(10, 2),
            allowNull: false,
            comment: 'Precio del producto'
        },
        stockProduct: {
            type: type.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: 'Cantidad disponible en stock'
        },
        imagenProduct: {
            type: type.STRING(255),
            allowNull: true,
            comment: 'URL de la imagen del producto'
        },
        marcaProduct: {
            type: type.STRING(50),
            Comment: 'Marca del producto',
        },
        presentacionProduct: {
            type: type.STRING(50),
            Comment: 'Presentación del producto (ej: "Caja de 10 tabletas")'
        },
    }, {
        timestamps: true,  // Crea createdAt y updatedAt automáticamente
        comment: 'Tabla de productos disponibles en la veterinaria'
    });
}
module.exports = products;