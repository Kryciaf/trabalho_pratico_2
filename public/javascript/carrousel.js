import { fetchData } from './api.js';

export const createCarouselItem = (breed, index) => {
    const item = document.createElement('div');
    item.className = 'carousel-item';

    const img = document.createElement('img');
    img.src = `./images/${breed.images_path}/${index}.jpg`;
    img.className = 'd-block w-100';
    img.style.cursor = 'pointer';
    img.alt = '...';

    img.onclick = function () {
        window.location.href = `album.html?breed=${breed.name}`;
    };

    item.appendChild(img);

    return item;
};

export const initializeCarousel = async () => {
    try {
        const data = await fetchData();
        const destaques = data.filter(breed => !! breed.destaque)
        const carouselItemsContainer = document.getElementById('carouselItems');

        if(! destaques.length) {
            for (let i = 1; i <= 3; i++) {
                const carouselItem = createCarouselItem(data[i], i);
                console.log(carouselItem)
    
                if (i === 1) {
                    carouselItem.classList.add('active');
                }
                
                carouselItemsContainer.appendChild(carouselItem);
            }

            return;
        }

        for(const breed of destaques) {
            const carouselItem = createCarouselItem(breed, 13);

            if (destaques[0] === breed) {
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
