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
