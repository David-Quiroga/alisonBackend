const petsNotesController = {}

const sql = require('../dataBase/dataBase.sql')

petsNotesController.create = async (req, res) => {
    const { noteContent, observations, diagnistic, treatment, medicine, nextVisit } = req.body

    try {
        await sql.query(
            'INSERT INTO pets_notes (noteContent, observations, diagnistic, treatment, medicine, nextVisit VALUES (?, ?, ?, ?, ?, ?)',
            [noteContent, observations, diagnistic, treatment, medicine, nextVisit]
        )
        res.status(200).json({ message: 'Nota de mascota creada correctamente' })
    } catch (error) {
        console.error("Error al crear nota de mascota:", error)
        res.status(500).json({ error: 'Error al crear nota de mascota' })
    }
}

petsNotesController.getAll = async (req, res) => {
    try {
        const notes = await sql.query('SELECT * FROM pets_notes')
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error al obtener notas de mascotas:", error)
        res.status(500).json({ error: 'Error al obtener notas de mascotas' })
    }
}

petsNotesController.update = async (req, res) => {
    const { id } = req.params
    const { noteContent, observations, diagnistic, treatment, medicine, nextVisit } = req.body

    try {
        await sql.query(
            'UPDATE pets_notes SET noteContent = ?, observations = ?, diagnistic = ?, treatment = ?, medicine = ?, nextVisit = ? WHERE idPetNote = ?',
            [noteContent, observations, diagnistic, treatment, medicine, nextVisit, id]
        )
        res.status(200).json({ message: 'Nota de mascota actualizada correctamente' })
    } catch (error) {
        console.error("Error al actualizar nota de mascota:", error)
        res.status(500).json({ error: 'Error al actualizar nota de mascota' })
    }
}

petsNotesController.delete = async (req, res) => {
    const { id } = req.params
    try {
        await sql.query('DELETE FROM pets_notes WHERE idPetNote = ?', [id])
        res.status(200).json({ message: 'Nota de mascota eliminada correctamente' })
    } catch (error) {
        console.error("Error al eliminar nota de mascota:", error)
        res.status(500).json({ error: 'Error al eliminar nota de mascota' })
    }
}

module.exports = petsNotesController