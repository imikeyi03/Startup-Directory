// Global variables
const apiURL = 'https://randomuser.me/api/?results=12';
const searchContainerDiv = document.querySelector('.search-container');
const galleryDiv = document.querySelector('#gallery');
const cardDiv = document.querySelector('.card');
let employees = {};


// Fetch data based on based in url
function fetchData(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            employees = data.results
            return data.results;
        })
        .then(generateCards)
        .catch(error => console.log('There was a problem with the fetch request',error));
}


function generateCards(data) {
    data.map(employee => {
        galleryDiv.insertAdjacentHTML('afterbegin', `
            <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${employee.picture.large}" alt="Profile Pic">
                </div>
                <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                        <p class="card-text">${employee.email}</p>
                        <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
                    </div>
                </div>
            </div>
        `)    
    });
}

function handleCardClick() {
    let cardDIV = document.getElementsByClassName('card');
    cardDIV.addEventListener('click', (e) => {
        console.log('hi');
    })
}

fetchData(apiURL);
