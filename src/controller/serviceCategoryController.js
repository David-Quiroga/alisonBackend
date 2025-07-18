const serviceCategoryController = {}

const sql = require('../dataBase/dataBase.sql')

serviceCategoryController.create = async (req, res) => {
    const { nameServiceCategory, descriptionServiceCategory } = req.body;

    try {
        await sql.query(
            'INSERT INTO servicecategories (nameServiceCategory, descriptionServiceCategory) VALUES (?, ?)',
            [nameServiceCategory, descriptionServiceCategory]
        );
        res.status(200).json({ message: 'Categoría de servicio creada correctamente' });
    } catch (error) {
        console.error("Error al crear categoría de servicio:", error);
        res.status(500).json({ error: 'Error al crear categoría de servicio' });
    }
}

serviceCategoryController.getAll = async (req, res) => {
    try {
        const categories = await sql.query('SELECT * FROM servicecategories');
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error al obtener categorías de servicio:", error);
        res.status(500).json({ error: 'Error al obtener categorías de servicio' });
    }
}

serviceCategoryController.update = async (req, res) => {
    const { id } = req.params;
    const { nameServiceCategory, descriptionServiceCategory } = req.body;

    try {
        await sql.query(
            'UPDATE servicecategories SET nameServiceCategory = ?, descriptionServiceCategory = ? WHERE idServiceCategory = ?',
            [nameServiceCategory, descriptionServiceCategory, id]
        );
        res.status(200).json({ message: 'Categoría de servicio actualizada correctamente' });
    } catch (error) {
        console.error("Error al actualizar categoría de servicio:", error);
        res.status(500).json({ error: 'Error al actualizar categoría de servicio' });
    }
}

serviceCategoryController.delete = async (req, res) => {
    const { id } = req.params;
    try {
        await sql.query('DELETE FROM servicecategories WHERE idServiceCategory = ?', [id]);
        res.status(200).json({ message: 'Categoría de servicio eliminada correctamente' });
    } catch (error) {
        console.error("Error al eliminar categoría de servicio:", error);
        res.status(500).json({ error: 'Error al eliminar categoría de servicio' });
    }
}
module.exports = serviceCategoryController;