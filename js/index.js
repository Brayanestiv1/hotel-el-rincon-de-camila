// Select the menu and button
const menu = document.getElementById('menu');
const menuBtn = document.getElementById('menu-btn');

// Toggle the menu
menuBtn.addEventListener('click', () => {
  document.body.classList.toggle('menu-open');
});

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
   registrationForm.addEventListener('submit', (e) => {
       e.preventDefault(); // Prevent default form submission

       const name = document.getElementById('name').value;
       const email = document.getElementById('email').value;

       // Validate and process data (this is a simple example)
       if (name && email) {
           alert(`Registro exitoso:\nNombre: ${name}\nEmail: ${email}`);
           modalOverlay.style.display = 'none'; // Close the modal
           registrationForm.reset(); // Clear the form
       } else {
           alert('Por favor, completa todos los campos.');
       }
   });