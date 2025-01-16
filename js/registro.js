// Tu código en frontend
const registroForm = document.getElementById('registerForm');

registroForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    // Usamos Axios para hacer una solicitud POST
    const response = await axios.post('http://localhost:4000/users', {
      username,
      email,
      password
    });

    alert('Usuario registrado con éxito!');
  } catch (error) {
    alert('Error al registrar el usuario');
  }
});
