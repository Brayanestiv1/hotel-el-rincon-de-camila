const express = require('express');
const axios = require('axios'); // se usa para hacer peticiones HTTP
const bodyParser = require('body-parser'); // se usa para parsear datos JSON
///En el contexto, body-parser es un middleware de Node.js que se utiliza para parsear (analizar y convertir) 
// los datos que se reciben en una solicitud HTTP (como un POST) al formato adecuado. En este caso, parsea los datos JSON, 
// lo que significa que toma una cadena de texto con formato JSON y la convierte en un objeto de JavaScript que puede ser 
// manipulado por el servidor.

const app = express();
const PORT = 4000; 

// Middleware para parsear datos JSON

app.use(bodyParser.json());

//URL de la AI  de JSON Server
const API_URL = 'http://localhost:5000/users'; // URL base para la API de usuarios

//Registro de ususario 
app. post('/users', async (req, res) => {
    const { username, password, email} = req.body;

    if (!username || !password || !email ) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios'});
    }

    try {
        // se verifica si el usuario ya existe (buscando el email)
        const { data: usuarios} = await axios.get (API_URL);
        const usuarioExistente = usuarios.find(usuario => usuario.email === email);
        if (usuarioExistente) {
            return res.status(400).json({error:'El email ya está registrado'});
        }

        // Crear un nuevo usuario
        const nuevoUsuario = {
            username,
            password,
            email, // aqui no estamos encriptando la contraseña, en un entorno real se deberia hacerlo
        };

        //Agregar el nuevo usuario a la base de datos (archivo JSON)
        const { data } = await axios.post(API_URL, nuevoUsuario);

        res.status(201).json({ message: 'Usuario registrado exitosamente', usuario: data});
    } catch (err) {
        res.status(500).json({ error: 'Error al registrar el usuario', details: err.message});
    }
});

//login de usuario
app.post('/users', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: 'El email y la contraseña son obligatorios' });
    }

    try {
        // Buscar el usuario por email
        const { data: usuarios } = await axios.get(API_URL);
        const usuario = usuarios.find(u => u.email === email && u.password === password);
    
        if (!usuario) {
          return res.status(400).json({ error: 'Credenciales inválidas' });
        }

        // Simular la respuesta con un "token" (en un caso real usarías JWT o sesiones)
        const token = `${usuario.id}-${usuario.email}-token`; // Simulamos un token de sesión

        res.json({ message: 'Inicio de sesión exitoso', token });
        } catch (err) {
        res.status(500).json({ error: 'Error al iniciar sesión', details: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});