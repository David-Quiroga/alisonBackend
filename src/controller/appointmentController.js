const appointmentController = {};
const sql = require('../dataBase/dataBase.sql'); // Asegúrate de que sea mysql2 o compatible

// Crear una nueva cita
appointmentController.create = async (req, res) => {
    const { date, reason, petId, vetId, notes } = req.body;

    try {
        await sql.query(
            'INSERT INTO appointments (date, reason, petId, vetId, notes) VALUES (?, ?, ?, ?, ?)',
            [date, reason, petId, vetId, notes]
        );
        res.status(201).json({ message: 'Cita creada correctamente' });
    } catch (error) {
        console.error("Error al crear la cita:", error);
        res.status(500).json({ error: 'Error al crear la cita' });
    }
};

// Obtener todas las citas
appointmentController.getAll = async (req, res) => {
    try {
        const [appointments] = await sql.query('SELECT * FROM appointments');
        res.status(200).json(appointments);
    } catch (error) {
        console.error("Error al obtener citas:", error);
        res.status(500).json({ error: 'Error al obtener citas' });
    }
};

// Obtener una cita por ID
appointmentController.getById = async (req, res) => {
    const { id } = req.params;

    try {
        const [appointment] = await sql.query('SELECT * FROM appointments WHERE idAppointment = ?', [id]);

        if (appointment.length === 0) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }

        res.status(200).json(appointment[0]);
    } catch (error) {
        console.error("Error al obtener la cita:", error);
        res.status(500).json({ error: 'Error al obtener la cita' });
    }
};

// Actualizar una cita
appointmentController.update = async (req, res) => {
    const { id } = req.params;
    const { date, reason, petId, vetId, notes } = req.body;

    try {
        await sql.query(
            'UPDATE appointments SET date = ?, reason = ?, petId = ?, vetId = ?, notes = ? WHERE idAppointment = ?',
            [date, reason, petId, vetId, notes, id]
        );
        res.status(200).json({ message: 'Cita actualizada correctamente' });
    } catch (error) {
        console.error("Error al actualizar la cita:", error);
        res.status(500).json({ error: 'Error al actualizar la cita' });
    }
};

// Eliminar una cita
appointmentController.delete = async (req, res) => {
    const { id } = req.params;

    try {
        await sql.query('DELETE FROM appointments WHERE idAppointment = ?', [id]);
        res.status(200).json({ message: 'Cita eliminada correctamente' });
    } catch (error) {
        console.error("Error al eliminar la cita:", error);
        res.status(500).json({ error: 'Error al eliminar la cita' });
    }
};

module.exports = appointmentController;
