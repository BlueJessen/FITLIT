import './css/styles.css';
import {
  allData
} from './apiCalls';
import Chart from 'chart.js/auto';
import CircleProgress from 'js-circle-progress';
import UserRepository from './UserRepository';
import User from './User';
import Hydration from './Hydration';
import Sleep from './Sleep';
import Activity from './Activity';

// query selectors -----------------------

var userCard = document.querySelector('.user-card');
var userFriends = document.querySelector('.user-friends');
var name = document.querySelector('#name');
var hydrationWidget = document.querySelector('.hydration');
var sleepWidget = document.querySelector('.sleep');
var innerDisplayHydration = document.querySelector('.inner-hydration');
var innerDisplaySleep = document.querySelector('.inner-sleep');
var sleepBtn = document.querySelector('.sleepBtn');
var waterBtn = document.querySelector('.waterBtn');
var waterChart = document.querySelector('.waterChart');
var sleepChart = document.querySelector('.sleepChart');
var hydrationCircle =document.querySelector('.progress-hydration');
let sleepCircle = document.querySelector('.progress-sleep');
let activityCircle = document.querySelector('.progress-activity');

// globals -----------------------
let userData = [];
let sleepData = [];
let activityData = [];
let hydrationData = [];
let randomUser;
let userArray;
let userRepo;
let sleepRepo;
let hydrationRepo;
let activityRepo

const activityProgress = new CircleProgress(activityCircle)
//EVENT LISTENERS -----------------------

window.addEventListener('load', () => {
  allData.then(data => {
    userData = data[0];
    console.log(userData)
    sleepData = data[1];
    activityData = data[2];
    console.log(activityData);
    hydrationData = data[3];
    initialSetup();

  }).catch(error => console.log(error))
});

sleepBtn.addEventListener('click', clickSleepBtn);
waterBtn.addEventListener('click', clickWaterBtn);

//Dom functions -----------------------

function displayUserInfo(user, repo) {
  name.innerHTML = `Welcome ${user.returnUserName()}!`;
  userCard.innerHTML = `
    <div class='user-info'> ${user.address}</div>
    <div class='user-info'> ${user.email}</div>
    <div class='user-info'> Stride Count: ${user.strideLength}</div>
    <div class='user-info'> Daily Step Goal: ${user.dailyStepGoal}</div>
    <div class='user-info'>All time average sleep (Quality): ${sleepRepo.findAverage(user.id, 'quality')}</div>
    <div class='user-info'>All time average sleep (Hours): ${sleepRepo.findAverage(user.id, 'hours')}</div>`;
  if (user.dailyStepGoal > repo.getAverageSteps()) {
    userCard.innerHTML += `<div class='user-info'> Your average step goal is ${user.dailyStepGoal -repo.getAverageSteps()} over the average of ${repo.getAverageSteps()}! Great work!</div>`
  } else {
    userCard.innerHTML += `<div class='user-info'> Your average step goal is ${repo.getAverageSteps() - user.dailyStepGoal} under the average of ${repo.getAverageSteps()}! You can STEP it up!</div>`
  }
  populateFriends(user);
};

function populateFriends(user) {
  userFriends.innerHTML = `<div> Friends: ${user.friends}</div>`;
}

function addProgressWidgetHydration(user, repo) {
  const hydrationProgress = new CircleProgress(hydrationCircle);
  let recentDate = repo.findRecentDate(user.id);
  let displayInfo = repo.findDateData(user.id, recentDate);
  hydrationProgress.max = 85;
  hydrationProgress.value = displayInfo;
}

function addProgressWidgetSleep(user, repo) {
  const sleepProgress = new CircleProgress(sleepCircle);
  let recentDate = repo.findRecentDate(user.id);
  let displayInfo = repo.findDateData(user.id, recentDate, 'hours');
  sleepProgress.max = 8;
  sleepProgress.value = displayInfo;
}

function showActivityDisplay (user, repo) {
  const activityProgress = new CircleProgress(activityCircle)
  let recentDate = repo.findRecentDate(user.id);
  let displayInfo = repo.findStepsForDate(user.id, recentDate);
  activityProgress.max = user.dailyStepGoal;
  activityProgress.value = displayInfo;
  activityProgress.textFormat = 'percent';
}

function initialSetup() {
  userArray = userData.userData.map(person => new User(person));
  userRepo = new UserRepository(userArray);
  sleepRepo = new Sleep(sleepData.sleepData);
  hydrationRepo = new Hydration(hydrationData.hydrationData);
  activityRepo = new Activity(activityData.activityData);
  randomUser = getRandomUser(userRepo.userData);

  displayUserInfo(randomUser, userRepo);
  addProgressWidgetSleep(randomUser, sleepRepo);
  addProgressWidgetHydration(randomUser, hydrationRepo);
  createWaterChart(randomUser);
  createSleepWidget(randomUser);
  showActivityDisplay(randomUser, activityRepo);
}

function createWaterChart(user) {
  const ctx = document.getElementById('waterChart').getContext('2d');
  let hydrationRepo = new Hydration(hydrationData.hydrationData);
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [{
        label: `${user.name}'s weekly hydration in fl oz`,
        data: hydrationRepo.findWeeklyData(user.id, hydrationRepo.findRecentDate(user.id)),
        backgroundColor: [
          'rgba(23, 97, 85, .7)',
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
  })
};

function createSleepWidget(user) {
  const ctx = document.getElementById('sleepChart').getContext('2d');
  let sleepRepo = new Sleep(sleepData.sleepData);
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [{
        label: `${user.name}'s Sleep Time in Hours`,
        data: sleepRepo.findWeeklyData(user.id, sleepRepo.findRecentDate(user.id), 'hours'),
        backgroundColor: [
          'rgba(0, 39, 44, 0.88)',
        ],
        borderColor: 'rgba(0, 39, 44, 0.88)',
        borderWidth: 2
      }, {
        label: `${user.name}'s Sleep Quality`,
        data: sleepRepo.findWeeklyData(user.id, sleepRepo.findRecentDate(user.id), 'quality'),
        backgroundColor: [
          'rgba(249, 130, 0, 0.8)',
        ],
        borderColor: 'rgba(249, 130, 0, 0.8)',
        borderWidth: 2

      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
};

function clickWaterBtn() {
  sleepChart.classList.add('hidden')
  waterBtn.classList.add('hidden')
  waterChart.classList.remove('hidden')
  sleepBtn.classList.remove('hidden')
};

function clickSleepBtn() {
  waterChart.classList.add('hidden')
  sleepBtn.classList.add('hidden')
  sleepChart.classList.remove('hidden')
  waterBtn.classList.remove('hidden')
};

//data functions -----------------------

function getRandomUser(array) {
  let randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}
