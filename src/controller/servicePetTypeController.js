const servicePetTypeController = {}

const sql = require('../dataBase/dataBase.sql')

servicePetTypeController.create = async (req, res) => {
    const { service_id, pet_type_id, observations } = req.body;

    try {
        await sql.query(
            'INSERT INTO servicepettypes (service_id, pet_type_id, observations) VALUES (?, ?, ?)',
            [service_id, pet_type_id, observations]
        );
        res.status(200).json({ message: 'Tipo de mascota creado correctamente' });
    } catch (error) {
        console.error("Error al crear tipo de mascota:", error);
        res.status(500).json({ error: 'Error al crear tipo de mascota' });
    }
}

servicePetTypeController.getAll = async (req, res) => {
    try {
        const petTypes = await sql.query('SELECT * FROM servicepettypes');
        res.status(200).json(petTypes);
    } catch (error) {
        console.error("Error al obtener tipos de mascota:", error);
        res.status(500).json({ error: 'Error al obtener tipos de mascota' });
    }
}

servicePetTypeController.update = async (req, res) => {
    const { id } = req.params;
    const { service_id, pet_type_id, observations } = req.body;

    try {
        await sql.query(
            'UPDATE servicepettypes SET service_id = ?, pet_type_id = ?, observations = ? WHERE idServicePetType = ?',
            [service_id, pet_type_id, observations, id]
        );
        res.status(200).json({ message: 'Tipo de mascota actualizado correctamente' });
    } catch (error) {
        console.error("Error al actualizar tipo de mascota:", error);
        res.status(500).json({ error: 'Error al actualizar tipo de mascota' });
    }
}

servicePetTypeController.delete = async (req, res) => {
    const { id } = req.params;
    try {
        await sql.query('DELETE FROM servicepettypes WHERE idServicePetType = ?', [id]);
        res.status(200).json({ message: 'Tipo de mascota eliminado correctamente' });
    } catch (error) {
        console.error("Error al eliminar tipo de mascota:", error);
        res.status(500).json({ error: 'Error al eliminar tipo de mascota' });
    }
}