
const images = document.querySelectorAll('.carousel-image');
let index = 0;

setInterval(() => {
    images.forEach(img => img.classList.remove('active'));
    index = (index + 1) % images.length;
    images[index].classList.add('active');
}, 3000);

