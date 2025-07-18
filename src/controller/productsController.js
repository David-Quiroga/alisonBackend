const productsContrroller = {}

const sql = require('../dataBase/dataBase.sql')

productsContrroller.create = async (req, res) => {
    const { 
        nameProducto, descriptionProducto, priceProduct, stockProduct, 
        imagenProduct, marcaProduct, presentationPorduct, petId 
    } = req.body;

    try {
        const [result] = await sql.query(
            'INSERT INTO products (nameProducto, descriptionProducto, priceProduct, stockProduct, imagenProduct, marcaProduct, presentationPorduct) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nameProducto, descriptionProducto, priceProduct, stockProduct, imagenProduct, marcaProduct, presentationPorduct]
        );
        const productId = result.insertId;
        await sql.query(
            'INSERT INTO productsType (productId, petId) VALUES (?, ?)',
            [productId, petId]
        );

        res.status(200).json({ message: 'Producto y tipo de producto creados correctamente' });
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ error: 'Error al crear producto y tipo de producto' });
    }
}



productsContrroller.getAll = async (req, res) => {
    try {
        const products = await sql.query('SELECT * FROM products');
        res.status(200).json(products);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
}

productsContrroller.update = async (req, res) => {
    const { id } = req.params;
    const { nameProducto, descriptionProducto, priceProduct, stockProduct, imagenProduct, marcaProduct, presentationPorduct } = req.body;

    try {
        await sql.query(
            'UPDATE products SET nameProducto = ?, descriptionProducto = ?, priceProduct = ?, stockProduct = ?, imagenProduct = ?, marcaProduct = ?, presentationPorduct = ? WHERE idProduct = ?',
            [nameProducto, descriptionProducto, priceProduct, stockProduct, imagenProduct, marcaProduct, presentationPorduct, id]
        );
        res.status(200).json({ message: 'Producto actualizado correctamente' });
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ error: 'Error al actualizar producto' });
    }
}

productsContrroller.delete = async (req, res) => {
    const { id } = req.params;
    try {
        await sql.query('DELETE FROM products WHERE idProduct = ?', [id]);
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
}

module.exports = productsContrroller;