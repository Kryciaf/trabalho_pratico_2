import { fetchData } from './api.js';

const urlParams = new URLSearchParams(window.location.search);
const breed = urlParams.get('breed');

export const createCarouselItem = (imagePath, index) => {
    const item = document.createElement('div');
    item.className = 'carousel-item';
    item.innerHTML = `<img src="./images/${imagePath}/${index}.jpg" class="d-block w-100" alt="...">`;

    return item;
};

export const initializeCarousel = async () => {
    try {
        const data = await fetchData();
        const carrouselData = data.find(item => item.name === breed);
        const carouselItemsContainer = document.getElementById('carouselItems');
        const album = document.getElementById('album');
        album.href = `album.html?breed=${breed}`
    
        for (let i = 1; i <= 13; i++) {
            const carouselItem = createCarouselItem(carrouselData.images_path, i);

            if (i === 1) {
                carouselItem.classList.add('active');
            }
            
            carouselItemsContainer.appendChild(carouselItem);
        }
    } catch (error) {
        console.error("Erro ao carregar dados do carrossel:", error);
    }
};

document.addEventListener("DOMContentLoaded", async function () {
    initializeCarousel();
});
