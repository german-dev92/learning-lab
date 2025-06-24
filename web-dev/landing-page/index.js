const images = document.querySelectorAll('.carousel-image');
let index = 0;

setInterval(() => {
    images.forEach(img => img.classList.remove('active'));
    index = (index + 1) % images.length;
    images[index].classList.add('active');
}, 3500);

document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(element => {
        observer.observe(element);
    });

    // Lógica del modal (correcta)
    const btnAbrir = document.getElementById('btn-politica');
    const modal = document.getElementById('modal-politica');
    const btnCerrar = document.getElementById('cerrar');

    btnAbrir.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    btnCerrar.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', e => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
