// Global variables
const apiURL = 'https://randomuser.me/api/?results=12&nat=us';
const searchContainerDiv = document.querySelector('.search-container');
const galleryDiv = document.querySelector('#gallery');
const body = document.querySelector('body');
let employees = {};
let cardsList = [];
let index = '';


// Fetch data based on url
function fetchData(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            employees = data.results
            return employees;
        })
        .then(generateCards)
        .then(cards => {
            cardsList = Array.from(cards);

            for(let i = 0; i < cards.length; i++) {
                cards[i].addEventListener('click', (e) => {
                    if(cards[i] === e.currentTarget) {
                        console.log(employees);
                        index = cardsList.indexOf(e.currentTarget);
                        console.log(cardsList);
                    }
                    handleCardClick(employees[index],index);
                })
               
            }
        })
        .catch(error => console.log('There was a problem with the fetch request',error));
}

function handleCardClick(employee,index) {
    const html = `
    <div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${employee.picture.large}" alt="${employee.name.first}\'s profile pic">
            <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="modal-text">${employee.email}</p>
            <p class="modal-text cap">${employee.location.city}</p>
            <hr>
            <p class="modal-text">${employee.cell}</p>
            <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
            <p class="modal-text">Birthday: ${employee.dob.date.slice(5,7)}/${employee.dob.date.slice(8,10)}/${employee.dob.date.slice(0,4)}</p>
        </div>
    </div>
    `;
    body.insertAdjacentHTML('beforeEnd', html)

    const modalContainer = document.querySelector('.modal-container');
    const modalBtn = document.querySelector('#modal-close-btn');
    modalBtn.addEventListener('click', (e) => {
        modalContainer.remove();
    })
}


function generateCards(data) {
    data.map(employee => {
        const html = `
            <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${employee.picture.large}" alt="${employee.name.first}\'s profile pic">
                </div>
                <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                        <p class="card-text">${employee.email}</p>
                        <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
                    </div>
                </div>
            </div>
        `;
        galleryDiv.insertAdjacentHTML('beforeEnd', html);    
    });
    return galleryDiv.children
}





fetchData(apiURL);
