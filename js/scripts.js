// Global variables
const apiURL = 'https://randomuser.me/api/?results=12&nat=us';
const searchContainerDiv = document.querySelector('.search-container');
const galleryDiv = document.querySelector('#gallery');
const body = document.querySelector('body');
let employees = {};
let cardsList = [];
let index = '';


// Fetch data based on url passed
function fetchData(url) {
    return fetch(url)
        .then(response => response.json())
        // Create a reference variable to the employee results
        .then(data => {
            employees = data.results
            return employees;
        })
        // Generate the employee cards
        .then(generateCards)
        // Create an array from the gallery div Children
        .then(cards => {
            cardsList = Array.from(cards);

            // Iterate over all the cards
            for(let i = 0; i < cards.length; i++) {
                // If a card is clicked, find it's current target and set the index to the matching index in the cardsList
                cards[i].addEventListener('click', (e) => {
                    if(cards[i] === e.currentTarget) {
                        index = cardsList.indexOf(e.currentTarget);
                    }
                    
                    //Pass the matching employee, at that index, to handleCardClick() to display the modal 
                    handleCardClick(employees[index],index);
                })
               
            }
        })
        .catch(error => console.log('There was a problem with the fetch request',error));
}

// When a card is clicked, display the modal

function handleCardClick(employee, index) {
    
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
                <p class="modal-text">${employee.cell.slice(0,5)} ${employee.cell.slice(6,14)}</p>
                <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                <p class="modal-text">Birthday: ${employee.dob.date.slice(5,7)}/${employee.dob.date.slice(8,10)}/${employee.dob.date.slice(0,4)}</p>
            </div>
        </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
    </div>
    `;
    body.insertAdjacentHTML('beforeEnd', html);


    // Select the modal & on a click event on the close btn, remove() the modal from the DOM
    const modalContainer = document.querySelector('.modal-container');
    const modalBtn = document.querySelector('#modal-close-btn');
    const modalPreviousBtn = document.querySelector('#modal-prev');
    const modalNextBtn = document.querySelector('#modal-next');

    if(index == 0) {
        modalPreviousBtn.style.display = 'none';
    }
    if(index == 11) {
        modalNextBtn.style.display = 'none';
    }

   

    modalPreviousBtn.addEventListener('click', () => {
         if(index >= 1 ) {
            cycleCards(employees[index - 1], index - 1)
        }
    })

    modalNextBtn.addEventListener('click', () => {
        if(index < 11) {
            cycleCards(employees[index + 1], index + 1)
         }
    })
    
    modalBtn.addEventListener('click', () => {
        modalContainer.remove();
    })
    

    function cycleCards(employee, index) {
        document.querySelector('.modal-container').remove();
        handleCardClick(employee, index)  
    }
}

// Maps over each employee returned from Fetch and displays them in cards

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







// Fetch the data from the randomUsers API
fetchData(apiURL);
