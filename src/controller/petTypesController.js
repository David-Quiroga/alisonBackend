const petTypeContoller = {};

const sql = require('../dataBase/dataBase.sql');

petTypeContoller.create = async (req, res) => {
    const { typeName } = req.body;

    try {
        await sql.query('INSERT INTO pettypes (typeName) VALUES (?)',
            [typeName]);
        res.status(200).json({ message: 'Tipo de mascota creado correctamente' });
    } catch (error) {
        console.error("Error al crear tipo de mascota:", error);
        res.status(500).json({ error: 'Error al crear tipo de mascota' });
    }
}

petTypeContoller.getAll = async (req, res) => {
    try {
        const petTypes = await sql.query('SELECT * FROM pettypes');
        res.status(200).json(petTypes);
    } catch (error) {
        console.error("Error al obtener tipos de mascotas:", error);
        res.status(500).json({ error: 'Error al obtener tipos de mascotas' });
    }
}

petTypeContoller.update = async (req, res) => {
    const { id } = req.params;
    const { typeName } = req.body;

    try {
        await sql.query('UPDATE pettypes SET typeName = ? WHERE idPetType = ?',
            [typeName, id]);
        res.status(200).json({ message: 'Tipo de mascota actualizado correctamente' });
    } catch (error) {
        console.error("Error al actualizar tipo de mascota:", error);
        res.status(500).json({ error: 'Error al actualizar tipo de mascota' });
    }
}

petTypeContoller.delete = async (req, res) => {
    const { id } = req.params;
    try {
        await sql.query('DELETE FROM pettypes WHERE idPetType = ?', [id]);
        res.status(200).json({ message: 'Tipo de mascota eliminado correctamente' });
    } catch (error) {
        console.error("Error al eliminar tipo de mascota:", error);
        res.status(500).json({ error: 'Error al eliminar tipo de mascota' });
    }
}

module.exports = petTypeContoller;