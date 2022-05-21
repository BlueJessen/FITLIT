import './css/styles.css';
import { allData } from './apiCalls';
import Chart from 'chart.js/auto';
import UserRepository from './UserRepository';
import User from './User';
import Hydration from './Hydration';
import Sleep from './Sleep';
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
var userCard = document.querySelector('.user-card');
var name = document.querySelector('#name');
var hydrationWidget = document.querySelector('.hydration');
var sleepWidget = document.querySelector('.sleep');

let userData = [];
let sleepData = [];
let activityData = [];
let hydrationData = [];

//EVENT LISTENERS -----------------------

window.addEventListener('load', () => {
  allData.then( data =>{
    userData = data[0];
    sleepData = data[1];
    activityData = data[2];
    hydrationData = data[3];
    initialSetup();

}).catch(error => console.log(error))
});

function getRandomUser(array) {
  let randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
}

function userToDisplay(user, repo) {
  name.innerHTML = user.returnUserName();
  userCard.innerHTML = `
    <!-- <div> Id: ${user.id}</div>
    <div> Name: ${user.name}</div> -->
    <div> Address: ${user.address}</div>
    <div> Email: ${user.email}</div>
    <div> Stride Count: ${user.strideLength}</div>
    <div> Daily Step Goal: ${user.dailyStepGoal}</div>
    <div> Friends: ${user.friends}</div>`;
  if (user.dailyStepGoal > repo.getAverage()) {
    userCard.innerHTML +=  `<div> Your average step goal is ${user.dailyStepGoal -repo.getAverage()} over the average of ${repo.getAverage()}! Great work!</div>`
  } else {
    userCard.innerHTML +=  `<div> Your average step goal is ${repo.getAverage() - user.dailyStepGoal} under the average of ${repo.getAverage()}! You can STEP it up!</div>`
  }
};

function hydrationDisplay (user, repo) {
  let recentDate = '2020/01/22';
  hydrationWidget.innerText =`Today's intake: ${repo.findDayHydration(user.id, recentDate)} Weekly Hydration: ${repo.findWeekHydration(user.id, recentDate)}`;
}

function sleepDisplay(user, repo) {
  let recentDate = '2020/01/22';
  console.log(repo.findWeeklySleepQuality(user.id, recentDate))
  sleepWidget.innerText = `Latest sleep data (Hours): ${repo.findDaySleepHours(user.id, recentDate)}
  Latest sleep data (Quality): ${repo.findDaySleepQuality(user.id, recentDate)}
   Weekly average (Hours): ${repo.findWeeklySleepHours(user.id, recentDate)}
   Weekly average (Quality): ${repo.findWeeklySleepQuality(user.id, recentDate)}
    All time average (Hours): ${repo.findAverageSleepHours(user.id)}
    All time average (Quality): ${repo.findAverageSleepQuality(user.id)}`;
}

function initialSetup () {
    let userArray = userData.userData.map(person => new User(person));
    let userRepo = new UserRepository(userArray);
    let sleepRepo = new Sleep(sleepData.sleepData);
    let hydrationRepo = new Hydration(hydrationData.hydrationData);
    let randomUser = getRandomUser(userRepo.userData);
    console.log(randomUser);
    userToDisplay(randomUser, userRepo);
    // sleepDisplay(randomUser, sleepRepo);
    // hydrationDisplay(randomUser, hydrationRepo);
    createBarChart(randomUser);
    createSleepWidget(randomUser);
    createHydrationWidget(randomUser);
}

function createBarChart(user) {
  const ctx = document.getElementById('myChart').getContext('2d');
  let hydrationRepo = new Hydration(hydrationData.hydrationData);
  new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
            label: `${user.name}'s weekly hydration in fl oz`,
              data: hydrationRepo.findWeekHydration(user.id, "2020/01/22"),
            backgroundColor: [
                'rgba(23, 97, 85, .7)',
            //     'rgba(54, 162, 235, 0.2)',
            //     'rgba(255, 206, 86, 0.2)',
            //     'rgba(75, 192, 192, 0.2)',
            //     'rgba(153, 102, 255, 0.2)',
            //     'rgba(255, 159, 64, 0.2)',
            //     'rgba(222, 111, 64, 0.2)'
            ],
            // borderColor: [
            //     'rgba(255, 99, 132, 1)',
            //     'rgba(54, 162, 235, 1)',
            //     'rgba(255, 206, 86, 1)',
            //     'rgba(75, 192, 192, 1)',
            //     'rgba(153, 102, 255, 1)',
            //     'rgba(255, 159, 64, 1)'
            // ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
})};

function createSleepWidget(user) {
  const ctx = document.getElementById('sleep').getContext('2d');
  let sleepRepo  = new Sleep(sleepData.sleepData);
  new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
            label: `${user.name}'s Sleep Info`,
              data: sleepRepo.findWeeklySleepHours(user.id, "2020/01/22"),
            backgroundColor: [
                'rgba(23, 97, 85, .7)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(222, 111, 64, 0.2)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
})};

function createHydrationWidget(user) {
  const ctx = document.getElementById('hydration').getContext('2d');
  let hydrationRepo  = new Hydration(hydrationData.hydrationData);
  new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["2020/01/22", "Average"],
        datasets: [{
            label: `${user.name}'s Day Hydration Info`,
              data: [hydrationRepo.findDayHydration(user.id, "2020/01/22"), 30],
            backgroundColor: [
                'rgba(23, 97, 85, .7)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
})};
