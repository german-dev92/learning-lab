// Header - Hamburguesa //
const toggleBtn = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.main-nav ul');

toggleBtn.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Mostrar descripción al hacer clic en los botones
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
  // Agrega los demás
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



// ===============================
// Carrusel de imágenes en "Sobre mí"
// ===============================
const images = document.querySelectorAll('.carousel-image');
let index = 0;

setInterval(() => {
    images.forEach(img => img.classList.remove('active'));
    index = (index + 1) % images.length;
    images[index].classList.add('active');
}, 3500);

// ===============================
// Animaciones con Intersection Observer (scroll reveal)
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // se ejecuta solo una vez
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(element => {
        observer.observe(element);
    });

    // ===============================
    // Modal de Política de Privacidad
    // ===============================
    const btnAbrir = document.getElementById('btn-politica');
    const modal = document.getElementById('modal-politica');
    const btnCerrar = document.getElementById('cerrar');

    // Abrir modal al hacer clic en el botón
    btnAbrir.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // Cerrar modal al hacer clic en la X
    btnCerrar.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', e => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
