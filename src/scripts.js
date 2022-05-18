import Chart from 'chart.js/auto';
import UserRepository from './UserRepository';
import User from './User';
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
var userCard = document.querySelector('.user-card');
var name = document.querySelector('#name');


function getRandomUser(array) {
  var randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
};

function userToDisplay(user, userRepo) {
  name.innerHTML = user.returnUserName();
  userCard.innerHTML = ``;
  userCard.innerHTML +=  `<div> Id: ${user.id}</div>`;
  userCard.innerHTML +=  `<div> Address: ${user.address}</div>`;
  userCard.innerHTML +=  `<div> Email: ${user.email}</div>`;
  userCard.innerHTML +=  `<div> Stride Count: ${user.strideLength}</div>`;
  userCard.innerHTML +=  `<div> Daily Step Goal: ${user.dailyStepGoal}</div>`;
  userCard.innerHTML +=  `<div> Friends: ${user.friends}</div>`;
  userCard.innerHTML +=  `<div> Name: ${user.name}</div>`;
  userCard.innerHTML +=  `<div> Average Step Goal: ${userRepo.getAverage()}</div>`;
};

function initialSetup() {
  fetch('https://fitlit-api.herokuapp.com/api/v1/users').then(response => response.json()).then(data => {
    let userArray = data.userData.map(person => new User(person));
    let userRepo = new UserRepository(userArray);
    let user = getRandomUser(userRepo.userData);
    userToDisplay(user, userRepo);
  });
}

initialSetup();

// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file
