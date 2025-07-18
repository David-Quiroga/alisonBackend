const appointmentStatusController = {};
const sql = require('../dataBase/dataBase.sql');

// Crear un estado de cita
appointmentStatusController.create = async (req, res) => {
    const { status, changedBy } = req.body;

    try {
        await sql.query(
            'INSERT INTO appointmentstatus (status, changedBy) VALUES (?, ?)',
            [status, changedBy]
        );
        res.status(201).json({ message: 'Estado de cita creado correctamente' });
    } catch (error) {
        console.error("Error al crear estado de cita:", error);
        res.status(500).json({ error: 'Error al crear estado de cita' });
    }
};

// Obtener todos los estados
appointmentStatusController.getAll = async (req, res) => {
    try {
        const [statuses] = await sql.query('SELECT * FROM appointmentstatus');
        res.status(200).json(statuses);
    } catch (error) {
        console.error("Error al obtener estados de cita:", error);
        res.status(500).json({ error: 'Error al obtener estados de cita' });
    }
};

// Eliminar un estado (opcional)
appointmentStatusController.delete = async (req, res) => {
    const { id } = req.params;
    try {
        await sql.query('DELETE FROM appointmentstatus WHERE idStatus = ?', [id]);
        res.status(200).json({ message: 'Estado eliminado correctamente' });
    } catch (error) {
        console.error("Error al eliminar estado:", error);
        res.status(500).json({ error: 'Error al eliminar estado' });
    }
};

module.exports = appointmentStatusController;
