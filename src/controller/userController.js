const users = {};
const orm = require('../dataBase/dataBase.orm');
const sql = require('../dataBase/dataBase.sql');

//TODO const secret = process.env.JWT_SECRET || 'tu_clave_secreta';

users.create = async (req, res) => {
    const { nombre, apellido, cedula, correo, password } = req.body;
    try {
        await sql.query(
            'INSERT INTO users (nombre, apellido, cedula, correo, password) VALUES (?, ?, ?, ?, ?)',
            [nombre, apellido, cedula, correo, password]
        )
        res.status(200).send('Usuario creado correctamente');
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).send('Error al crear usuario');
    }
}

users.login = async (req, res) => {
    const { correo, password } = req.body;
    try {
        const user = await orm.users.findOne({ where: { correo, password } });
        if (!user) {
            return res.status(401).send('Credenciales inválidas');
        }
        res.status(200).send('Inicio de sesión exitoso');
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).send('Error al iniciar sesión');
    }
}