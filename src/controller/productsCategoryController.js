const producstCategoryController  = {}

const sql = require('../dataBase/dataBase.sql');

producstCategoryController.create = async (req, res) => {
    const { nombreCategory, descriptionCategory, imagenCategory } = req.body;

    try {
        await sql.query(
            'INSERT INTO productscategories (nombreCategory, descriptionCategory, imagenCategory) VALUES (?, ?, ?)',
            [nombreCategory, descriptionCategory, imagenCategory]
        );
        res.status(200).json({ message: 'Categoría creada correctamente' });
    } catch (error) {
        console.error("Error al crear categoría:", error);
        res.status(500).json({ error: 'Error al crear categoría' });
    }
}

producstCategoryController.getAll = async (req, res) => {
    try {
        const categories = await sql.query('SELECT * FROM productscategories');
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error al obtener categorías:", error);
        res.status(500).json({ error: 'Error al obtener categorías' });
    }
}

producstCategoryController.update = async (req, res) => {
    const { id } = req.params;
    const { nombreCategory, descriptionCategory, imagenCategory } = req.body;

    try {
        await sql.query(
            'UPDATE productscategories SET nameCategory = ?, descriptionCategory = ?, imagenCategory = ? WHERE idProductCategory = ?',
            [nombreCategory, descriptionCategory, imagenCategory, id]
        );
        res.status(200).json({ message: 'Categoría actualizada correctamente' });
    } catch (error) {
        console.error("Error al actualizar categoría:", error);
        res.status(500).json({ error: 'Error al actualizar categoría' });
    }
}

producstCategoryController.delete = async (req, res) => {
    const { id } = req.params;
    try {
        await sql.query('DELETE FROM productscategories WHERE idProductCategory = ?', [id]);
        res.status(200).json({ message: 'Categoría eliminada correctamente' });
    } catch (error) {
        console.error("Error al eliminar categoría:", error);
        res.status(500).json({ error: 'Error al eliminar categoría' });
    }
}

module.exports = producstCategoryController;