const rolController = {};
const sql = require('../dataBase/dataBase.sql');

rolController.create = async (req, res) => {
    const { nameRole, descriptionRole } = req.body;

    try {
        await sql.query(
            'INSERT INTO roles (nameRole, descriptionRole) VALUES (?, ?)',
            [nameRole, descriptionRole]
        );
        res.status(201).json({ message: 'Rol creado correctamente' });
    } catch (error) {
        console.error('Error al crear rol:', error);
        res.status(500).json({ error: 'Error al crear rol' });
    }
};

rolController.getAll = async (req, res) => {
    try {
        const [roles] = await sql.query('SELECT * FROM roles');
        res.status(200).json(roles);
    } catch (error) {
        console.error('Error al obtener roles:', error);
        res.status(500).json({ error: 'Error al obtener roles' });
    }
};

rolController.getById = async (req, res) => {
    const { id } = req.params;

    try {
        const [roles] = await sql.query('SELECT * FROM roles WHERE idRoles = ?', [id]);
        if (roles.length === 0) {
        return res.status(404).json({ error: 'Rol no encontrado' });
    }
        res.status(200).json(roles[0]);
    } catch (error) {
        console.error('Error al obtener rol:', error);
        res.status(500).json({ error: 'Error al obtener rol' });
    }
};

rolController.update = async (req, res) => {
    const { id } = req.params;
    const { nameRole, descriptionRole } = req.body;

    try {
        await sql.query(
        'UPDATE roles SET nameRole = ?, descriptionRole = ? WHERE idRoles = ?',
        [nameRole, descriptionRole, id]
    );
        res.status(200).json({ message: 'Rol actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar rol:', error);
        res.status(500).json({ error: 'Error al actualizar rol' });
    }
};

rolController.delete = async (req, res) => {
    const { id } = req.params;

    try {
        await sql.query('DELETE FROM roles WHERE idRoles = ?', [id]);
        res.status(200).json({ message: 'Rol eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar rol:', error);
        res.status(500).json({ error: 'Error al eliminar rol' });
    }
};

module.exports = rolController;