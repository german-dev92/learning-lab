// ===============================
// Esperar que todo cargue
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  // Hamburguesa
  const toggleBtn = document.getElementById('menu-toggle');
  const navMenu = document.querySelector('.main-nav ul');

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Modal de proyectos
  const modal = document.getElementById('modal-proyecto');
  const modalTitle = document.getElementById('modal-titulo');
  const modalImg = document.getElementById('modal-img');
  const modalDesc = document.getElementById('modal-desc');
  const modalPdf = document.getElementById('modal-pdf');
  const closeModal = document.querySelector('.cerrar-modal');

  const projectData = {
    1: {
      title: 'Predicción de precios BTC',
      img: 'images/bitcoin-proyecto.png',
      desc: 'Proyecto de predicción de precios de Bitcoin con modelos de clasificación supervisada.',
      pdf: 'pdfs/bitcoin-prediccion.pdf'
    },
    2: {
      title: 'Análisis Cripto',
      img: 'images/cripto-analisis.png',
      desc: 'Exploración de datos del mercado cripto para encontrar patrones de inversión.',
      pdf: 'pdfs/analisis-cripto.pdf'
    },
    // Más proyectos...
  };

  document.querySelectorAll('.project-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.project;
      const data = projectData[id];

      modalTitle.textContent = data.title;
      modalImg.src = data.img;
      modalDesc.textContent = data.desc;
      modalPdf.href = data.pdf;

      modal.removeAttribute('hidden');
      modal.style.display = 'flex';
    });
  });

  closeModal.addEventListener('click', () => {
    modal.setAttribute('hidden', true);
    modal.style.display = 'none';
  });

  // Carrusel
  const images = document.querySelectorAll('.carousel-image');
  let index = 0;
  setInterval(() => {
    images.forEach(img => img.classList.remove('active'));
    index = (index + 1) % images.length;
    images[index].classList.add('active');
  }, 3500);

  // Animaciones al hacer scroll
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));

  // Modal Política de Privacidad
  const btnAbrir = document.getElementById('btn-politica');
  const modalPolitica = document.getElementById('modal-politica');
  const btnCerrar = document.getElementById('cerrar');

  btnAbrir.addEventListener('click', () => {
    modalPolitica.style.display = 'flex';
  });

  btnCerrar.addEventListener('click', () => {
    modalPolitica.style.display = 'none';
  });

  window.addEventListener('click', e => {
    if (e.target === modalPolitica) {
      modalPolitica.style.display = 'none';
    }
  });
  
const form = document.querySelector("#contacto form");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const mensaje = document.getElementById("mensaje");
const consentimiento = document.getElementById("consentimiento");

form.addEventListener("submit", function (e) {
  // Limpiar todos los customValidity
  nombre.setCustomValidity("");
  email.setCustomValidity("");
  mensaje.setCustomValidity("");
  consentimiento.setCustomValidity("");

  let errores = false;

  // Validación nombre
  if (nombre.value.trim() === "") {
    nombre.setCustomValidity("Por favor, ingresa tu nombre.");
    errores = true;
  }

  // Validación email
  if (email.value.trim() === "") {
    email.setCustomValidity("Por favor, ingresa tu correo.");
    errores = true;
  } else if (!validarEmail(email.value)) {
    email.setCustomValidity("El formato del correo no es válido.");
    errores = true;
  }

  // Validación mensaje
  if (mensaje.value.trim() === "") {
    mensaje.setCustomValidity("Por favor, escribe un mensaje.");
    errores = true;
  }

  // Validación consentimiento
  if (!consentimiento.checked) {
    consentimiento.setCustomValidity("Debes aceptar la Política de Privacidad.");
    errores = true;
  }

  if (errores) {
    e.preventDefault(); // Bloquear envío
    form.reportValidity(); // Mostrar errores nativos del navegador
  } else {
    // No se necesita e.preventDefault(); el form se enviará normalmente
  }
});

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

});
