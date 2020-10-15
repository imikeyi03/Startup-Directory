// Global variables
const apiURL = 'https://randomuser.me/api/?results=12';
const searchContainerDiv = document.querySelector('.search-container');
const galleryDiv = document.querySelector('#gallery');
const cardDiv = document.querySelector('.card');



// Fetch data based on based in url
function fetchData(url) {
    fetch(url)
        .then(response => response.json())
        .then(getRandomPeople)
        .then(generateCards)
        .catch(error => console.log('There was a problem with the fetch request',error));
}



// Get the random peoples data such as profileIMG,name,email,city,state 
function getRandomPeople(data) {
    const randomPeople = data.results.map(employee => {
        return employee;
    })
   return randomPeople; 
}



function generateCards(data) {
    data.map(person => {
        galleryDiv.insertAdjacentHTML('beforeend', `
            <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${person.picture.large}" alt="Profile Pic">
                </div>
                <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                        <p class="card-text">${person.email}</p>
                        <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
                    </div>
                </div>
            </div>
        `)    
    })
}




fetchData(apiURL);