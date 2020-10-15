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
     console.log(`getRandomPeople ran! Check out the ${data}`);
     return data;
}


function generateCards(data) {
    console.log(`generateCards ran! Check out the ${data}`)
}




fetchData(apiURL);