/*Menu hamburguesa */

// Selección de elementos
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

// Alternar clase para mostrar/ocultar el menú
menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active'); // Cambia la clase 'active' en el menú
    menuBtn.classList.toggle('open'); // Cambia la animación del botón
});

// Opcional: Cerrar el menú al hacer clic en un enlace
menu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        menu.classList.remove('active');
        menuBtn.classList.remove('open');
    }
});


/*Carrusel*/
function App () {}

  window.onload = function(event) {
    var app = new App();
    window.app = app
  }

  App.prototype.processingButton = function (event) {

    const btn = event.currentTarget;
    const carruselList = event.currentTarget.parentNode;
    const track = event.currentTarget.parentNode.querySelector('#track');
    const carrusel = track.querySelectorAll('.carrusel');

    const carruselWidth = carrusel[0].offsetWidth;

    const trackWidth = track.offsetWidth;
    const listWidth = carruselList.offsetWidth;

    track.style.left == '' ? leftPosition = track.style.left = 0 : leftPosition = parseFloat(track.style.left.slice(0,-2) * -1);
    btn.dataset.button == 'button-prev' ? prevAction(leftPosition,carruselWidth, track) : nextAction(leftPosition, trackWidth, listWidth, carruselWidth, track);
    
  }

  let prevAction = (leftPosition, carruselWidth, track) => {
    if (leftPosition > 0) {
      track.style.left =  `${-1 * (leftPosition - carruselWidth)}px`;
    }
  }

  let nextAction = (leftPosition, trackWidth, listWidth, carruselWidth, track) => {
    if (leftPosition < (trackWidth - listWidth)) {
      track.style.left =  `${-1 * (leftPosition + carruselWidth)}px`;
    }
  }


  //----------Modar de registro----------// 

  //registrarse

// Get elements
const openModalOption = document.getElementById('openModal');
const closeModalButton = document.getElementById('closeModal');
const modalOverlay = document.getElementById('modalOverlay');
const registrationForm = document.getElementById('registrationForm');

// Open modal
openModalOption.addEventListener('click', () => {
    modalOverlay.style.display = 'flex';
});

// Close modal
closeModalButton.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
});

// Close modal when clicking outside the modal
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.style.display = 'none';
    }
});

// Handle form submission
registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate and process data
    if (name && email && password) {
        try {
            // First check if email already exists
            const responseEmailCheck = await fetch(`https://json-server-vjur.onrender.com/users?email=${email}`);
            const emailData = await responseEmailCheck.json();

            if (emailData.length > 0) {
                // Email already exists
                alert('El correo electrónico ya está registrado. Por favor, ingresa otro correo.');
            } else {
                // If email is not taken, check if name is available
                const responseNameCheck = await fetch(`https://json-server-vjur.onrender.com/users?name=${name}`);
                const nameData = await responseNameCheck.json();

                if (nameData.length > 0) {
                    // Name already exists
                    alert('El nombre de usuario ya está registrado. Por favor, ingresa otro nombre.');
                } else {
                    // If both email and name are available, proceed to register
                    const responseRegister = await fetch('https://json-server-vjur.onrender.com/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ name, email, password, reservación: null })
                    });

                    if (responseRegister.ok) {
                        const result = await responseRegister.json();
                        alert(`Registro exitoso: ${result.message || 'Datos guardados correctamente.'}`);
                        modalOverlay.style.display = 'none'; // Close the modal
                        registrationForm.reset(); // Clear the form
                    } else {
                        alert('Error en el registro. Intenta nuevamente.');
                    }
                }
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
            alert('Hubo un problema al verificar los datos. Revisa tu conexión.');
        }
    } else {
        alert('Por favor, completa todos los campos.');
    }
});


  //----------------------Modar de login----------------------


// Obtener elementos del DOM
const openLoginModal = document.getElementById('login-button'); // Opción para abrir el modal de login
const openRegisterModal = document.getElementById('openModal'); // Opción para abrir el modal de registro
const closeLoginModal = document.getElementById('closeLoginModal'); // Botón para cerrar el modal de login
const loginModalOverlay = document.getElementById('loginModalOverlay'); // Overlay del modal de login
const loginForm = document.getElementById('loginForm'); // Formulario de login
const userNameDisplay = document.getElementById('user-name'); // Contenedor para mostrar el nombre del usuario después de login
const logoutButton = document.createElement('button'); // Botón para cerrar sesión

// Configuración del botón de cerrar sesión
logoutButton.textContent = 'Cerrar sesión';
logoutButton.id = 'logout-button';
logoutButton.style.display = 'none'; // Inicialmente oculto
logoutButton.addEventListener('click', () => {
    // Eliminar datos del usuario del localStorage y actualizar la interfaz
    localStorage.removeItem('user');
    userNameDisplay.textContent = '';
    userNameDisplay.classList.add('ocultar');
    logoutButton.style.display = 'none';
    openRegisterModal.classList.remove('ocultar');
    openLoginModal.classList.remove('ocultar');
    alert('Sesión cerrada exitosamente.');
});

// Añadir el botón de cerrar sesión al DOM
userNameDisplay.parentElement.appendChild(logoutButton);


// Abrir modal de login
openLoginModal.addEventListener('click', () => {
    loginModalOverlay.style.display = 'flex'; // Mostrar el modal de login
});

// Abrir modal de registro
openRegisterModal.addEventListener('click', () => {
    // Lógica para abrir el modal de registro si es necesario
    // Se puede añadir código aquí si necesitas abrir un modal de registro
});

// Cerrar modal de login
closeLoginModal.addEventListener('click', () => {
    loginModalOverlay.style.display = 'none'; // Ocultar el modal de login
});

// Cerrar modal al hacer clic fuera de él
loginModalOverlay.addEventListener('click', (e) => {
    if (e.target === loginModalOverlay) {
        loginModalOverlay.style.display = 'none';
    }
});

// Manejar el envío del formulario de login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evitar el envío tradicional del formulario

    const email = document.getElementById('loginEmail').value; // Obtener el email ingresado
    const password = document.getElementById('loginPassword').value; // Obtener la contraseña ingresada

    if (email && password) {
        try {
            // Realizar una petición GET al servidor con los datos del usuario
            const response = await fetch(`https://json-server-vjur.onrender.com/users?email=${email}&password=${password}`);

            if (response.ok) {
                const users = await response.json(); // Parsear la respuesta JSON

                if (users.length > 0) {
                    // Usuario encontrado
                    const user = users[0]; // Obtener el primer usuario que coincida
                    alert(`Bienvenido, ${user.name || 'usuario'}. Inicio de sesión exitoso.`);

                    // Guardar los datos del usuario en localStorage
                    localStorage.setItem('user', JSON.stringify(user));

                    // Ocultar las opciones de Login y Registro
                    openRegisterModal.classList.add('ocultar');
                    openLoginModal.classList.add('ocultar');

                    // Mostrar el nombre del usuario y el botón de cerrar sesión
                    userNameDisplay.textContent = user.name; // Mostrar el nombre del usuario
                    userNameDisplay.classList.remove('ocultar');
                    logoutButton.style.display = 'block';

                    // Cerrar el modal de login
                    loginModalOverlay.style.display = 'none';
                    loginForm.reset(); // Limpiar el formulario
                } else {
                    // Usuario no encontrado
                    alert('Usuario o contraseña incorrectos. Verifica tus datos.');
                }
            } else {
                // Error en la respuesta del servidor
                alert('Hubo un error al verificar tus credenciales. Intenta nuevamente más tarde.');
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
            alert('Hubo un problema al verificar los datos. Revisa tu conexión.');
        }
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

// Verificar si hay un usuario guardado en localStorage al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
        const user = JSON.parse(storedUser);

        // Actualizar la interfaz con los datos del usuario
        userNameDisplay.textContent = user.name;
        userNameDisplay.classList.remove('ocultar');
        logoutButton.style.display = 'block';
        openRegisterModal.classList.add('ocultar');
        openLoginModal.classList.add('ocultar');
    }
});



/*------------------modal user-name------------------ */


// Obtener los elementos del DOM
const userNameElement = document.getElementById('user-name'); // Elemento donde se muestra el nombre del usuario en el menú
const profileModalOverlay = document.getElementById('profileModalOverlay'); // Overlay del modal de perfil
const closeProfileModal = document.getElementById('closeProfileModal'); // Botón para cerrar el modal de perfil
const profileName = document.getElementById('profileName'); // Elemento donde se mostrará el nombre del usuario en el modal
const profileEmail = document.getElementById('profileEmail'); // Elemento donde se mostrará el email del usuario en el modal
const reservationsList = document.getElementById('reservationsList'); // Lista de reservaciones

// Verificar si el nombre del usuario está disponible
if (userNameElement) {
    // Aquí asumimos que el nombre del usuario ya está disponible en el menú
    // Cuando el usuario haga clic en su nombre, se abre el modal de perfil
    userNameElement.addEventListener('click', async () => {
        profileModalOverlay.style.display = 'flex'; // Mostrar el modal de perfil

        // Aquí asumimos que el ID del usuario logueado está guardado o lo obtenemos de alguna forma
        const userId = 1; // Reemplazar con el ID real del usuario logueado

        try {
            // Obtener los detalles del perfil del usuario desde la API
            const userResponse = await fetch(`https://json-server-vjur.onrender.com/users/${userId}`);
            if (userResponse.ok) {
                const user = await userResponse.json();
                // Actualizar los campos del perfil en el modal
                profileName.textContent = user.name;
                profileEmail.textContent = user.email;

                // Llamar a la API para obtener las reservaciones del usuario
                const reservationsResponse = await fetch(`https://json-server-vjur.onrender.com/reservations?userId=${userId}`);
                if (reservationsResponse.ok) {
                    const reservations = await reservationsResponse.json();
                    // Limpiar la lista de reservas
                    reservationsList.innerHTML = '';
                    // Mostrar cada reserva
                    reservations.forEach(reservation => {
                        const listItem = document.createElement('li');
                        listItem.textContent = `Reserva: ${reservation.date} - ${reservation.details}`;
                        reservationsList.appendChild(listItem);
                    });
                } else {
                    alert('No se pudieron cargar las reservas.');
                }
            } else {
                alert('No se pudo obtener la información del usuario.');
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            alert('Hubo un problema al obtener los datos.');
        }
    });
}

// Cerrar el modal de perfil
closeProfileModal.addEventListener('click', () => {
    profileModalOverlay.style.display = 'none'; // Ocultar el modal de perfil
});

// Cerrar el modal de perfil al hacer clic fuera de él
profileModalOverlay.addEventListener('click', (e) => {
    if (e.target === profileModalOverlay) {
        profileModalOverlay.style.display = 'none'; // Ocultar el modal de perfil
    }
});


// Guardar el usuario en el localStorage al iniciar sesión
function iniciarSesion(usuario) {
  localStorage.setItem('usuario', JSON.stringify(usuario));
}

// Verificar si el usuario está conectado (al cargar la página)
function verificarSesion() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  if (usuario) {
      mostrarUsuario(usuario);
  } else {
      // Mostrar formulario de inicio de sesión o redirigir
      mostrarFormularioInicioSesion();
  }
}




/*------------------------filtro cabañas----------------------------- */


/*------------------------filtro cabañas----------------------------- */

//----------------------Formulario de Reservas----------------------
// Cargar todas las cabañas al cargar la página

// Define displayResults primero
function displayResults(cabanas) {
    const resultsContainer = document.querySelector(".results .cabanas-list");
    resultsContainer.innerHTML = "";
  
    if (cabanas.length === 0) {
      resultsContainer.innerHTML = "<p>No se encontraron cabañas disponibles.</p>";
      return;
    }
  
    cabanas.forEach((cabana) => {
      const cabanaItem = document.createElement("li");
      cabanaItem.classList.add("cabana-item");
      cabanaItem.innerHTML = `
        <h3>Cabaña ${cabana.id}</h3>
        <img src="${cabana.imagen}" alt="Imagen de la cabaña" class="cabana-image" />
        <p>Precio: $${cabana.precio}</p>
        <p>Personas: ${cabana.personas}</p>
        <p>Extras: ${Array.isArray(cabana.extras) ? cabana.extras.join(", ") : "Ninguno"}</p>
        <button class="reserve-button" data-id="${cabana.id}">Reservar</button>
      `;
      resultsContainer.appendChild(cabanaItem);
    });
  }
  
  // Función para obtener todas las cabañas al cargar la página
  async function loadAllCabanas() {
    try {
      const response = await fetch("https://json-server-vjur.onrender.com/cabanas");
      if (!response.ok) {
        throw new Error(`Error en la respuesta del servidor: ${response.status}`);
      }
  
      const data = await response.json();
      const cabanas = data.cabanas || data; // Ajustar si el API tiene estructura diferente
      displayResults(cabanas); // Mostrar todas las cabañas al inicio
    } catch (error) {
      console.error("Error al cargar todas las cabañas:", error);
      alert("Hubo un problema al cargar las cabañas. Inténtalo nuevamente.");
    }
  }
  
  // Función para realizar la búsqueda y filtrado de cabañas
  async function searchCabanas() {
    const checkIn = document.getElementById("check-in").value;
    const checkOut = document.getElementById("check-out").value;
    const personas = document.getElementById("personas").value;
  
    try {
      // Realizamos la petición GET para obtener las cabañas filtradas
      const response = await fetch(`https://json-server-vjur.onrender.com/cabanas?checkIn=${checkIn}&checkOut=${checkOut}&personas=${personas}`);
      
      if (!response.ok) {
        throw new Error(`Error al buscar las cabañas: ${response.status}`);
      }
  
      const data = await response.json();
      const cabanas = data.cabanas || data; // Ajustar si el API tiene estructura diferente
      displayResults(cabanas); // Mostrar las cabañas filtradas
    } catch (error) {
      console.error("Error al buscar las cabañas:", error);
      alert("Hubo un problema al filtrar las cabañas. Inténtalo nuevamente.");
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    // Cargar todas las cabañas cuando se carga la página
    loadAllCabanas(); 
  });
  
  // Agregar eventos a los botones de reservar
  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("reserve-button")) {
      const cabanaId = e.target.getAttribute("data-id"); // Obtener ID de la cabaña
      const checkIn = document.getElementById("check-in").value; // Fechas del formulario
      const checkOut = document.getElementById("check-out").value;
  
      // Verificar si el usuario está logeado
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("Debes iniciar sesión para hacer una reserva.");
        return; // Detener ejecución si no está logeado
      }
  
      try {
        // Hacer la solicitud GET para obtener los datos actuales de la cabaña
        const response = await fetch(`https://json-server-vjur.onrender.com/cabanas/${cabanaId}`);
        if (!response.ok) {
          throw new Error(`Error al verificar la cabaña: ${response.status}`);
        }
  
        const currentCabanaData = await response.json();
  
        // Verificar disponibilidad
        if (!currentCabanaData.disponible || currentCabanaData.fecha !== null) {
          alert("Lo sentimos, esta cabaña ya está reservada o no está disponible.");
          return; // Detener ejecución si no está disponible
        }
  
        // Mantener todos los datos de la cabaña y solo cambiar fecha y disponibilidad
        const updatedCabanaData = {
          ...currentCabanaData, // Mantener todos los datos actuales
          fecha: { checkIn, checkOut }, // Solo cambiar las fechas
          disponible: false, // Cambiar a no disponible
        };
  
        // Realizar la solicitud PATCH para actualizar la cabaña
        const patchResponse = await fetch(`https://json-server-vjur.onrender.com/cabanas/${cabanaId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCabanaData),
        });
  
        if (!patchResponse.ok) {
          throw new Error("Error al actualizar la cabaña.");
        }
  
        // Realizar una segunda solicitud GET para verificar que los datos se hayan actualizado correctamente
        const verifyResponse = await fetch(`https://json-server-vjur.onrender.com/cabanas/${cabanaId}`);
        if (!verifyResponse.ok) {
          throw new Error(`Error al verificar la cabaña después de actualizar: ${verifyResponse.status}`);
        }
  
        const verifiedCabana = await verifyResponse.json();
  
        // Verificar que solo los campos "fecha" y "disponible" se hayan actualizado correctamente
        if (
          verifiedCabana.fecha.checkIn === checkIn &&
          verifiedCabana.fecha.checkOut === checkOut &&
          verifiedCabana.disponible === false
        ) {
          // Si todo está correcto, proceder con la reservación del usuario
          const updatedUser = {
            ...user, // Mantener datos actuales del usuario
            reservacion: [...(user.reservacion || []), cabanaId], // Agregar la nueva cabaña a las reservaciones
          };
  
          const userResponse = await fetch(`https://json-server-vjur.onrender.com/users/${user.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
          });
  
          if (!userResponse.ok) {
            throw new Error("Error al actualizar las reservaciones del usuario.");
          }
  
          // Actualizar el usuario en localStorage
          localStorage.setItem("user", JSON.stringify(updatedUser));
  
          alert("Reservación realizada con éxito.");
        } else {
          throw new Error("Hubo un problema al actualizar la cabaña. Los cambios no se aplicaron correctamente.");
        }
      } catch (error) {
        console.error("Error al realizar la reserva:", error);
        alert("Hubo un problema al realizar la reserva. Inténtalo nuevamente.");
      }
    }
  });
  
  // Evento para el botón de búsqueda
  document.getElementById("search-button").addEventListener("click", (e) => {
    e.preventDefault(); // Prevenir la recarga de la página
    searchCabanas(); // Realizar la búsqueda
  });