// === INICIO: DOMContentLoaded === //
document.addEventListener("DOMContentLoaded", () => {

  // === NAV / HAMBURGUESA ===
  const toggleBtn = document.getElementById('menu-toggle');
  const navMenu = document.querySelector('.main-nav ul');
  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // === HERO: BOTONES PROYECTO - MODAL ===
  const modal = document.getElementById('modal-proyecto');
  const modalTitle = document.getElementById('modal-titulo');
  const modalImg = document.getElementById('modal-img');
  const modalDesc = document.getElementById('modal-desc');
  const modalPdf = document.getElementById('modal-pdf');
  const closeModal = document.querySelector('.cerrar-modal');

  const projectData = {
    1: {
      title: 'Predicción de precios BTC',
      img: 'images/bitocoin.png',
      desc: 'Desarrollar un sistema capaz de predecir si el precio de una criptomoneda aumentará o disminuirá en las próximas 24 horas, utilizando datos de mercado en tiempo real. Como caso de estudio se utilizó Bitcoin, aunque el modelo se entrenó con datos de las 100 criptomonedas principales según su capitalización.',
      pdf: 'pdf/informe_bitcoin.pdf'
    },
    2: {
      title: 'Clasificación Automática de Opiniones Hoteleras',
      img: 'images/booking.png',
      desc: 'Desarrollar un modelo automático de clasificación que determine si una crítica hotelera es favorable o desfavorable, utilizando reseñas de Booking.com como fuente de datos. Dado el desbalance en las clases (mayoría de críticas positivas), se priorizó el uso de métricas como ROC AUC en lugar de accuracy.',
      pdf: 'pdf/booking.pdf'
    },
    3: {
      title: 'Análisis de Destino Residencial en Edificios de la Comunidad de Madrid',
      img: 'images/viviendasmadrid.png',
      desc: 'Analizar la proporción de edificios destinados principalmente a viviendas familiares en la Comunidad de Madrid, usando datos censales oficiales del año 2001. El objetivo es identificar patrones territoriales, detectar zonas con baja presencia residencial y extraer oportunidades de acción pública o privada.',
      pdf: 'pdf/VIVIENDAS_MADRID.pdf'
    },
    4: {
      title: 'TFM German Velasquez UAM',
      img: 'images/tfm.png',
      desc: 'Este Trabajo Fin de Máster se centra en el análisis del consumo de productos petrolíferos en las comunidades autónomas de España entre 2020 y 2024, con el objetivo de identificar patrones de consumo y proyectar tendencias hasta 2026. En el marco de la transición energética y las políticas públicas, se ha utilizado una combinación de técnicas de análisis de datos, segmentación y modelado predictivo para explorar cómo podría evolucionar la demanda de combustibles fósiles en los próximos años.',
      pdf: 'pdf/TFM-GV.pdf'
    }
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

  // === SOBRE MÍ: Carrusel de fotos automático con pausa al hacer clic ===
  // === SOBRE MÍ: Carrusel de fotos automático con pausa al hacer clic ===
  const images = document.querySelectorAll('.carousel-image');
  let currentSobreIndex = 0;
  let sobreIntervalId;
  let isPaused = false;

  function showSobreImage(index) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
  }

  function startSobreCarousel() {
    sobreIntervalId = setInterval(() => {
      if (!isPaused) {
        currentSobreIndex = (currentSobreIndex + 1) % images.length;
        showSobreImage(currentSobreIndex);
      }
    }, 3000);
  }

  images.forEach(img => {
    img.addEventListener('mousedown', () => {
      isPaused = true;
    });

    img.addEventListener('mouseup', () => {
      isPaused = false;
    });

    img.addEventListener('mouseleave', () => {
      isPaused = false;
    });
  });

  showSobreImage(currentSobreIndex);
  startSobreCarousel();

  // === PROYECTOS: CARRUSEL ===
  const track = document.querySelector(".carrusel-track");
  const allCardsOriginal = Array.from(document.querySelectorAll(".proyecto-card"));

  const firstClone = allCardsOriginal[0].cloneNode(true);
  const lastClone = allCardsOriginal[allCardsOriginal.length - 1].cloneNode(true);

  track.appendChild(firstClone);
  track.insertBefore(lastClone, allCardsOriginal[0]);

  const cards = Array.from(track.children);

  const btnPrev = document.querySelector(".carrusel-btn.prev");
  const btnNext = document.querySelector(".carrusel-btn.next");

  let currentIndex = 1;
  let autoplayInterval;

  function updateCarrusel(animate = true) {
    cards.forEach(card => {
      card.classList.remove("activa", "previa", "siguiente");
    });

    const total = allCardsOriginal.length;
    let realIndex = currentIndex;
    if (realIndex === 0) realIndex = total;
    if (realIndex === total + 1) realIndex = 1;

    const prevIndex = realIndex - 1 < 1 ? total : realIndex - 1;
    const nextIndex = realIndex + 1 > total ? 1 : realIndex + 1;

    cards[realIndex].classList.add("activa");
    cards[prevIndex].classList.add("previa");
    cards[nextIndex].classList.add("siguiente");

    const cardStyle = getComputedStyle(cards[0]);
    const cardWidth = cards[0].offsetWidth;
    const gap = parseInt(cardStyle.marginRight) || 32;
    const containerWidth = track.parentElement.offsetWidth;

    const scrollTo = -((cardWidth + gap) * currentIndex - (containerWidth / 2) + (cardWidth / 2));

    if (animate) {
      track.style.transition = "transform 0.5s ease-in-out";
    } else {
      track.style.transition = "none";
    }
    track.style.transform = `translateX(${scrollTo}px)`;

    updatePagination(realIndex - 1);
  }

  btnNext.addEventListener('click', () => {
    if (currentIndex >= cards.length - 1) return;
    currentIndex++;
    updateCarrusel();
    resetAutoplay();
  });

  btnPrev.addEventListener('click', () => {
    if (currentIndex <= 0) return;
    currentIndex--;
    updateCarrusel();
    resetAutoplay();
  });

  track.addEventListener('transitionend', () => {
    const total = allCardsOriginal.length;
    if (currentIndex === 0) {
      currentIndex = total;
      updateCarrusel(false);
    }
    if (currentIndex === total + 1) {
      currentIndex = 1;
      updateCarrusel(false);
    }
  });

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

  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      btnNext.click();
    }, 6000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  const paginacionContainer = document.createElement("div");
  paginacionContainer.classList.add("carrusel-paginacion");

  allCardsOriginal.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("dot");
    dot.addEventListener("click", () => {
      currentIndex = index + 1;
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

  updateCarrusel(false);
  startAutoplay();

  // === HABILIDADES: MODAL ===
const icons = document.querySelectorAll('.habilidad-icono');
const skillModal = document.getElementById('habilidad-modal');
const modalHabilidad = document.getElementById('modal-habilidad');
const modalNivel = document.getElementById('modal-nivel');

icons.forEach(icon => {
  icon.addEventListener('mouseenter', (e) => {
    const habilidad = icon.dataset.habilidad;
    const nivel = icon.dataset.nivel;

    modalHabilidad.textContent = habilidad;
    modalNivel.textContent = `Nivel: ${nivel}`;

    const rect = icon.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollX = window.scrollX || window.pageXOffset;

    // Posicionamos el modal centrado arriba del icono
    skillModal.style.position = 'absolute';
    skillModal.style.left = `${rect.left + rect.width / 2 + scrollX}px`;
    skillModal.style.top = `${rect.top + scrollY - 10}px`;
    skillModal.style.transform = 'translate(-50%, -100%)';
    skillModal.style.zIndex = '1000';
    skillModal.style.display = 'block';
    skillModal.style.pointerEvents = 'none'; // Para evitar interacción no deseada
  });

  icon.addEventListener('mouseleave', () => {
    skillModal.style.display = 'none';
  });
});

  // === ANIMACIÓN REVEAL SCROLL ===
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));


  // === POLÍTICA DE PRIVACIDAD: MODAL ===
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

  // === FORMULARIO DE CONTACTO: VALIDACIÓN ===
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
// === FIN: DOMContentLoaded === //
// Modal de imagen ampliada
const modalImg = document.getElementById("modal-img-proyecto");
const imgAmpliada = document.getElementById("img-ampliada");
const cerrarModalImg = document.querySelector(".cerrar-modal-img");

document.querySelectorAll(".proyecto-card img").forEach(img => {
  img.addEventListener("click", () => {
    imgAmpliada.src = img.src;
    imgAmpliada.alt = img.alt;
    modalImg.style.display = "block";
  });
});

cerrarModalImg.addEventListener("click", () => {
  modalImg.style.display = "none";
});

modalImg.addEventListener("click", (e) => {
  if (e.target === modalImg) modalImg.style.display = "none";
});
