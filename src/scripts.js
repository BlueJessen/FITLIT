import Chart from 'chart.js/auto';
import UserRepository from './UserRepository';
import User from './User';
// import getPromise from './apiCalls';
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

var userCard = document.querySelector('.user-card');
var name = document.querySelector('#name');

fetch('https://fitlit-api.herokuapp.com/api/v1/users').then(response => response.json()).then(data => {

  let userArray = data.userData.map(person => new User(person));
  let userRepo = new UserRepository(userArray);
  let user = getRandomUser(userRepo.userData);
  userCard.innerHTML =  `<div> Id: ${user.id}</div>
                <div> Name: ${user.name}</div>
                <div> Address: ${user.address}</div>
                <div> Email: ${user.email}</div>
                <div> Stride Count: ${user.strideLength}</div>
                <div> Daily Step Goal: ${user.dailyStepGoal}</div>
                <div> Friends: ${user.friends}</div>
                <div> Average Step Goal: ${userRepo.getAverage()}</div>`;
});


//   userArray = data.userData.map((person) => {
//  return new User(person)
// }));
// console.log(userArray);
//userData.map(user => {return new User(user)});

// var userRepo = new UserRepository(userArray)
// console.log(userRepo);
// var user = getRandomUser(userRepo.userData);
//event listener


function getRandomUser(array) {
  var randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
};


console.log("REPO", userRepo)



//INPUT:
// 1) Class new UserRepository which holds the User class
// 2) Passing into function
// 3) Using iterator loop to properly filter through each instance-selecting one by their assigned ID
// 4) Implementing data through innerText/innerHTML
// 5) the Char should hold a User instance data
function welcomeUser() {
  console.log(user);
  name.innerHTML = user.returnUserName();
}

welcomeUser();

function userToDisplay() {
  userCard.innerHTML =  `<div> Id: ${user.id}</div>
                <div> Name: ${user.name}</div>
                <div> Address: ${user.address}</div>
                <div> Email: ${user.email}</div>
                <div> Stride Count: ${user.strideLength}</div>
                <div> Daily Step Goal: ${user.dailyStepGoal}</div>
                <div> Friends: ${user.friends}</div>
                <div> Average Step Goal: ${userRepo.getAverage()}</div>`;

};

userToDisplay();


console.log(userData,"<>>>>userData")
// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file
