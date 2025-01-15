const express = require('express');
const axios = require('axios'); // Para peticiones HTTP
const bodyParser = require('body-parser'); // Para parsear datos JSON
const bcrypt = require('bcrypt'); // Para encriptar contraseñas
const jwt = require('jsonwebtoken'); // Para generar tokens de autenticación

const app = express();
const PORT = 4000;

// Middleware para parsear datos JSON
app.use(bodyParser.json());

// URL de la API de JSON Server
const API_URL = 'http://localhost:5000/users'; // URL base para la API de usuarios

// **REGISTRO DE USUARIO** (POST /users)
app.post('/users', async (req, res) => {
  const { username, password, email } = req.body;

  // Validación: Todos los campos son obligatorios
  if (!username || !password || !email) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    // Verificar si el usuario ya existe (por email)
    const { data: usuarios } = await axios.get(API_URL);
    const usuarioExistente = usuarios.find(usuario => usuario.email === email);
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Encriptar la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const nuevoUsuario = { username, password: hashedPassword, email };

    // Guardar el nuevo usuario en JSON Server
    const { data } = await axios.post(API_URL, nuevoUsuario);

    res.status(201).json({ message: 'Usuario registrado exitosamente', usuario: data });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar el usuario', details: err.message });
  }
});

// **LOGIN DE USUARIO** (POST /users/login)
app.post('/users', async (req, res) => {
  const { email, password } = req.body;

  // Validación: Todos los campos son obligatorios
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
  }

  try {
    // Obtener usuarios de la API
    const { data: usuarios } = await axios.get(API_URL);

    // Verificar si el usuario existe
    const usuario = usuarios.find(user => user.email === email);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const contraseñaValida = await bcrypt.compare(password, usuario.password);
    if (!contraseñaValida) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Generar un token JWT (opcional)
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, 'secreto', { expiresIn: '1h' });

    res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor', details: err.message });
  }
});

// Servidor escuchando en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
