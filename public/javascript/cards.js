import { fetchData } from './api.js'

export const createCard = (breed) => {
    const card = document.createElement('div');
    card.className = 'col-12 col-md-3 mt-3';
    card.innerHTML = `
        <div class="card h-100">
            <a href="album.html?breed=${breed.name}" class="text-decoration-none text-dark">
                <img src="./images/${breed.images_path}/13.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h4>${breed.name}</h4>
                    <p>${breed.description}</p>
                </div>
            </a>
        </div>
    `;
    return card;
};

document.addEventListener("DOMContentLoaded", function () {
    const appendCardsToContainer = (container, breeds) => {
        breeds.forEach(breed => {
            const card = createCard(breed);
            
            container.appendChild(card);
        });
    };

    fetchData()
        .then(data => {
            const new_data = data.filter(e => e.name !== "carrocel")
            const row = document.getElementById('row');

            appendCardsToContainer(row, new_data);
        })
        .catch(error => {
            alert(error)
        });
});


