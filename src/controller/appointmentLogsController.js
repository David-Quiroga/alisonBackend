const appointmentLogsController = {};
const sql = require('../dataBase/dataBase.sql');

// Crear un log de cita
appointmentLogsController.create = async (req, res) => {
    const { action, details, createdBy } = req.body;

    try {
        await sql.query(
            'INSERT INTO appointmentlogs (action, details, createdBy) VALUES (?, ?, ?)',
            [action, details, createdBy]
        );
        res.status(201).json({ message: 'Log de cita creado correctamente' });
    } catch (error) {
        console.error("Error al crear log de cita:", error);
        res.status(500).json({ error: 'Error al crear log de cita' });
    }
};

// Obtener todos los logs
appointmentLogsController.getAll = async (req, res) => {
    try {
        const [logs] = await sql.query('SELECT * FROM appointmentlogs');
        res.status(200).json(logs);
    } catch (error) {
        console.error("Error al obtener logs de cita:", error);
        res.status(500).json({ error: 'Error al obtener logs de cita' });
    }
};

// Eliminar un log (opcional)
appointmentLogsController.delete = async (req, res) => {
    const { id } = req.params;
    try {
        await sql.query('DELETE FROM appointmentlogs WHERE idLog = ?', [id]);
        res.status(200).json({ message: 'Log eliminado correctamente' });
    } catch (error) {
        console.error("Error al eliminar log:", error);
        res.status(500).json({ error: 'Error al eliminar log' });
    }
};

module.exports = appointmentLogsController;
