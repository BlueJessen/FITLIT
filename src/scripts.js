
import userData from './data/users';
import Chart from 'chart.js/auto';
import UserRepository from './UserRepository';
import User from './User';

// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
var userCard = document.querySelector('.user-card');
var name = document.querySelector('#name');
var user = new User({
    "id": 1,
    "name": "Luisa Hane",
    "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
    "email": "Diana.Hayes1@hotmail.com",
    "strideLength": 4.3,
    "dailyStepGoal": 10000,
    "friends": [
      16,
      4,
      8
    ]
  }
)
//event listener



//INPUT:
// 1) Class new UserRepository which holds the User class
// 2) Passing into function
// 3) Using iterator loop to properly filter through each instance-selecting one by their assigned ID
// 4) Implementing data through innerText/innerHTML
// 5) the Char should hold a User instance data



function userToDisplay() {
  userCard.innerHTML =  `<div>${user.id}</div>
                <div>${user.name}</div>
                <div>${user.address}</div>
                <div>${user.email}</div>
                <div>${user.strideLength}</div>
                <div>${user.dailyStepGoal}</div>
                <div>${user.friends}</div>`;
};

userToDisplay();

console.log(userData,"<>>>>userData")
// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file
