const serviceController = {};

const sql = require('../dataBase/dataBase.sql');

serviceController.create = async (req, res) => {
    const { nombreService, descriptionService, imageService, priceService, durationService } = req.body;
    //- const imagen = req.file ? req.file.path : null;
    
    try {
        await sql.query(
            'INSERT INTO services (nombreService, descriptionService, imageService, priceService, durationService) VALUES (?, ?, ?, ?, ?)',
            [nombreService, descriptionService, imageService, priceService, durationService]
        );
        res.status(200).json({ message: 'Servicio creado correctamente' });
    } catch (error) {
        console.error("Error al crear servicio:", error);
        res.status(500).json({ error: 'Error al crear servicio' });
    }
}

serviceController.getAll = async (req, res) => {
    try {
        const servicios = await sql.query('SELECT * FROM service');
        res.status(200).json(servicios);
    } catch (error) {
        console.error("Error al obtener servicios:", error);
        res.status(500).json({ error: 'Error al obtener servicios' });
    }
}

serviceController.update = async (req, res) => {
    const { id } = req.params;
    const { nombreService, descriptionService, imageService, priceService, durationService } = req.body;
    // Si se sube una nueva imagen
    const imagen = req.file ? req.file.path : null;
    
    try {
        // Primero obtenemos el servicio actual para mantener la imagen si no se actualiza
        const servicioActual = await sql.query('SELECT imageService FROM services WHERE idService = ?', [id]);
        
        const imagenActualizada = imagen || servicioActual[0].imageService;
        
        await sql.query(
            'UPDATE services SET nombreService = ?, descriptionService = ?, imageService = ?, priceService = ?, durationService = ? WHERE idService = ?',
            [nombreService, descriptionService, imageService, priceService, durationService, id]
        );
        
        res.status(200).json({ message: 'Servicio actualizado correctamente' });
    } catch (error) {
        console.error("Error al actualizar servicio:", error);
        res.status(500).json({ error: 'Error al actualizar servicio' });
    }
}

serviceController.delete = async (req, res) => {
    const { id } = req.params;
    try {
        await sql.query('DELETE FROM services WHERE idService = ?', [id]);
        res.status(200).json({ message: 'Servicio eliminado correctamente' });
    } catch (error) {
        console.error("Error al eliminar servicio:", error);
        res.status(500).json({ error: 'Error al eliminar servicio' });
    }
}

module.exports = serviceController;