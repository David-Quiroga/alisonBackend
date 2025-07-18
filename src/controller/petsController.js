const petsController = {}

const sql = requiere('../dataBase/dataBase.sql')

petsController.create = async (req, res) => {
    const {namePet, razaPet, edadPet, sexoPet, type_id, user_id} = req.body

    try {
        await sql.query(
            'INSERT INTO pets (namePet, razaPet, edadPet, sexoPet, type_id, user_id) VALUES (?, ?, ?, ?, ?, ?)',
            [namePet, razaPet, edadPet, sexoPet, type_id, user_id]
        )
        res.status(200).json({ message: 'Mascota creada correctamente' })
    } catch (error) {
        console.error("Error al crear mascota:", error)
        res.status(500).json({ error: 'Error al crear mascota' })
    }
}

petsController.getAll = async (req, res) => {
    try {
        const pets = await sql.query('SELECT * FROM pets')
        res.status(200).json(pets)
    } catch (error) {
        console.error("Error al obtener mascotas:", error)
        res.status(500).json({ error: 'Error al obtener mascotas' })
    }
}   

petsController.update = async (req, res) => {
    const { id } = req.params
    const { namePet, razaPet, edadPet, sexoPet, type_id, user_id } = req.body

    try {
        await sql.query(
            'UPDATE pets SET namePet = ?, razaPet = ?, edadPet = ?, sexoPet = ?, type_id = ?, user_id = ? WHERE idPets = ?',
            [namePet, razaPet, edadPet, sexoPet, type_id, user_id, id]
        )
        res.status(200).json({ message: 'Mascota actualizada correctamente' })
    } catch (error) {
        console.error("Error al actualizar mascota:", error)
        res.status(500).json({ error: 'Error al actualizar mascota' })
    }
}

petsController.delete = async (req, res) => {
    const { id } = req.params
    try {
        await sql.query('DELETE FROM pets WHERE idPets = ?', [id])
        res.status(200).json({ message: 'Mascota eliminada correctamente' })
    } catch (error) {
        console.error("Error al eliminar mascota:", error)
        res.status(500).json({ error: 'Error al eliminar mascota' })
    }
}
module.exports = petsController