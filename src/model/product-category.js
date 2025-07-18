const productsCategory = (sequelize, type) =>{
    return sequelize.define('productsCategory', {
        idProductCategory: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'ID único de la categoría del producto'
        },
        nombreCategory: {
            type: type.STRING(100),
            allowNull: false,
            comment: 'Nombre de la categoría del producto'
        },
        descriptionCategory: {
            type: type.TEXT,
            allowNull: true,
            comment: 'Descripción de la categoría del producto'
        },
        imagenCategory: {
            type: type.STRING(255),
            allowNull: true,
            comment: 'URL de la imagen de la categoría del producto'
        },
    }, {
        timestamps: true,  // Crea createdAt y updatedAt automáticamente
        comment: 'Tabla de categorías de productos disponibles en la veterinaria'
    });
}
module.exports = productsCategory;