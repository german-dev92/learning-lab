document.addEventListener("DOMContentLoaded", () => {
  // === Hamburguesa ===
  const toggleBtn = document.getElementById('menu-toggle');
  const navMenu = document.querySelector('.main-nav ul');

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // === Modal de proyectos ===
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

 const track = document.querySelector(".carrusel-track");
const allCardsOriginal = Array.from(document.querySelectorAll(".proyecto-card"));

// Clonar última y primera tarjeta para loop infinito
const firstClone = allCardsOriginal[0].cloneNode(true);
const lastClone = allCardsOriginal[allCardsOriginal.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, allCardsOriginal[0]);

// Ahora el array completo con clones incluidos
const cards = Array.from(track.children);

const btnPrev = document.querySelector(".carrusel-btn.prev");
const btnNext = document.querySelector(".carrusel-btn.next");

let currentIndex = 1; // Empieza en la primera tarjeta real (índice 1)
let autoplayInterval;

function updateCarrusel(animate = true) {
  // Limpiar clases de todas las tarjetas
  cards.forEach(card => {
    card.classList.remove("activa", "previa", "siguiente");
  });

  // Añadir clases a la tarjeta activa y sus vecinas reales (sin contar clones)
  // Calculamos índices reales para "previa" y "siguiente" dentro del rango de las tarjetas originales
  const total = allCardsOriginal.length;

  // Ajustamos índices en el rango 1..total (porque 0 y total+1 son clones)
  let realIndex = currentIndex;
  if (realIndex === 0) realIndex = total;
  if (realIndex === total + 1) realIndex = 1;

  // Indices relativas para clases
  const prevIndex = realIndex - 1 < 1 ? total : realIndex - 1;
  const nextIndex = realIndex + 1 > total ? 1 : realIndex + 1;

  // Aplicar clases solo a tarjetas reales:
  // cards[1..total] corresponden a tarjetas reales, cards[0] y cards[total+1] son clones
  cards[realIndex].classList.add("activa");
  cards[prevIndex].classList.add("previa");
  cards[nextIndex].classList.add("siguiente");

  const cardStyle = getComputedStyle(cards[0]);
  const cardWidth = cards[0].offsetWidth;
  const gap = parseInt(cardStyle.marginRight) || 32;

  const containerWidth = track.parentElement.offsetWidth;

  // Calcular desplazamiento centrado según currentIndex (con clones)
  const scrollTo = -((cardWidth + gap) * currentIndex - (containerWidth / 2) + (cardWidth / 2));

  // Controlar animación
  if (animate) {
    track.style.transition = "transform 0.5s ease-in-out";
  } else {
    track.style.transition = "none";
  }
  track.style.transform = `translateX(${scrollTo}px)`;

  updatePagination(realIndex -1); // índice 0-based para paginación (sin clones)
}

btnNext.addEventListener('click', () => {
  if (currentIndex >= cards.length - 1) return; // evitar overflow
  currentIndex++;
  updateCarrusel();

  resetAutoplay();
});

btnPrev.addEventListener('click', () => {
  if (currentIndex <= 0) return; // evitar underflow
  currentIndex--;
  updateCarrusel();

  resetAutoplay();
});

// Cuando la transición termina, comprobamos si estamos en un clone para "resetear" sin animación
track.addEventListener('transitionend', () => {
  const total = allCardsOriginal.length;

  if (currentIndex === 0) {
    // Estamos en clone al inicio (última tarjeta real)
    currentIndex = total;
    updateCarrusel(false);
  }
  if (currentIndex === total + 1) {
    // Estamos en clone al final (primera tarjeta real)
    currentIndex = 1;
    updateCarrusel(false);
  }
});

// === Swipe (táctil) ===
let startX = 0;
let isDragging = false;

track.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

track.addEventListener("touchend", e => {
  if (!isDragging) return;
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  if (diff > 50) {
    btnPrev.click();
  } else if (diff < -50) {
    btnNext.click();
  }

  isDragging = false;
});

// === Autoplay ===
function startAutoplay() {
  autoplayInterval = setInterval(() => {
    btnNext.click();
  }, 6000);
}

function resetAutoplay() {
  clearInterval(autoplayInterval);
  startAutoplay();
}

// === Paginación ===
const paginacionContainer = document.createElement("div");
paginacionContainer.classList.add("carrusel-paginacion");

allCardsOriginal.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.classList.add("dot");
  dot.addEventListener("click", () => {
    currentIndex = index + 1; // +1 porque el 0 es clone
    updateCarrusel();
    resetAutoplay();
  });
  paginacionContainer.appendChild(dot);
});

track.parentElement.appendChild(paginacionContainer);

function updatePagination(activeIndex) {
  const dots = paginacionContainer.querySelectorAll(".dot");
  dots.forEach(dot => dot.classList.remove("activo"));
  dots[activeIndex].classList.add("activo");
}

// Inicializa el carrusel centrado en la primera tarjeta real (index 1)
updateCarrusel(false);
startAutoplay();


  // === Animaciones al hacer scroll ===
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

  // === Modal Política de Privacidad ===
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

  // === Validación formulario ===
  const form = document.querySelector("#contacto form");
  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
  const mensaje = document.getElementById("mensaje");
  const consentimiento = document.getElementById("consentimiento");

  form.addEventListener("submit", function (e) {
    nombre.setCustomValidity("");
    email.setCustomValidity("");
    mensaje.setCustomValidity("");
    consentimiento.setCustomValidity("");

    let errores = false;

    if (nombre.value.trim() === "") {
      nombre.setCustomValidity("Por favor, ingresa tu nombre.");
      errores = true;
    }

    if (email.value.trim() === "") {
      email.setCustomValidity("Por favor, ingresa tu correo.");
      errores = true;
    } else if (!validarEmail(email.value)) {
      email.setCustomValidity("El formato del correo no es válido.");
      errores = true;
    }

    if (mensaje.value.trim() === "") {
      mensaje.setCustomValidity("Por favor, escribe un mensaje.");
      errores = true;
    }

    if (!consentimiento.checked) {
      consentimiento.setCustomValidity("Debes aceptar la Política de Privacidad.");
      errores = true;
    }

    if (errores) {
      e.preventDefault();
      form.reportValidity();
    }
  });

  function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});