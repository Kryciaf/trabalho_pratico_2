import { fetchData } from './api.js';

const urlParams = new URLSearchParams(window.location.search);
const breed = urlParams.get('breed');

const createCardHTML = (breed, index) => `
    <div class="card h-100">
        <a href="item.html?breed=${breed.name}" class="text-decoration-none text-dark">
            <img src="./images/${breed.images_path}/${index}.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h4>${breed.name}</h4>
                <p>${breed.sub_descriptions[index - 1]}</p>
            </div>
        </a>
    </div>
`;

const createCard = (breed, index) => {
    const card = document.createElement('div');
    card.className = 'col-12 col-md-3 mt-3';
    card.innerHTML = createCardHTML(breed, index);

    return card;
};

document.addEventListener('DOMContentLoaded', function () {
    fetchData()
        .then(data => {
            const breedData = data.find(e => e.name === breed);
            const destaqueButton = document.getElementById('destaqueButton');
            const row = document.getElementById('row');
            const registerTime = document.getElementById('register-time');
            const description = document.getElementById('description');
            const main_image = document.getElementById('main-image');
            const location = document.getElementById('location');
            const title = document.getElementById('title');

            title.innerHTML = breedData.name;
            registerTime.innerHTML = breedData.register_time;
            description.innerHTML = breedData.description;
            main_image.src = `./images/${breedData.images_path}/13.jpg`;
            location.innerHTML = breedData.location;

            if (breedData.destaque == false) {
                destaqueButton.innerHTML = 'Destacar';
                destaqueButton.classList.add('btn-primary');
                destaqueButton.classList.remove('btn-danger');
            } else {
                destaqueButton.textContent = 'Remover Destaque';
                destaqueButton.classList.remove('btn-primary');
                destaqueButton.classList.add('btn-danger');
            }

            for (let i = 1; i <= 12; i++) {
                const card = createCard(breedData, i);

                row.appendChild(card);
            }

            destaqueButton.addEventListener('click', function () {
                updateAPI(breed);
            });
        })
        .catch(error => {
            alert(error);
        });
});

async function updateAPI(breed) {
    try {
        const data = await fetchData();
        const breedData = data.find(e => e.name === breed);

        breedData.destaque = !breedData.destaque;

        const response = await fetch(`http://localhost:3000/breeds/${breedData.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(breedData),
        });

        if (! response.ok) {
            throw new Error('Falha ao atualizar a API');
        }

        const destaqueButton = document.getElementById('destaqueButton');
        if (breedData.destaque == false) {
            destaqueButton.innerHTML = 'Destacar';
            destaqueButton.classList.add('btn-primary');
            destaqueButton.classList.remove('btn-danger');
        } else {
            destaqueButton.textContent = 'Remover Destaque';
            destaqueButton.classList.remove('btn-primary');
            destaqueButton.classList.add('btn-danger');
        }
    } catch (error) {
        alert(error.message);
    }
}
