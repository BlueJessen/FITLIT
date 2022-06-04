import './css/styles.css';
import {
  allData
} from './apiCalls';
import {
createWaterChart,
createSleepWidget,
} from './chartFunctions';
import Chart from 'chart.js/auto';
import UserRepository from './UserRepository';
import User from './User';
import Hydration from './Hydration';
import Sleep from './Sleep';


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

function createHydrationDisplay(user, repo) {
  let recentDate = repo.findRecentDate(user.id);
  let displayInfo = getRectangleDegree(repo.findDateData(user.id, recentDate), 85);
  setProgressWidget(displayInfo, 'hydration');
}

function setProgressWidget(info, type) {
  let rectangleAmount = Math.ceil(info.degree / 90);
  let degreeSkew = getDegreeSkew(rectangleAmount, info);
  if (type === 'hydration') {
    addProgressWidgetHydration(info, degreeSkew, rectangleAmount);
  }else if (type === 'sleep') {
    addProgressWidgetSleep(info, degreeSkew, rectangleAmount);
  }
}

function addProgressWidgetHydration(info, degreeSkew, rectangleAmount) {
  innerDisplayHydration.innerText = `${info.percent.toFixed(2)}%
  ${info.userInfo} fl oz`;
  for (let i = 0; i < rectangleAmount; i++) {
    hydrationWidget.innerHTML += `<div class= "rectangle-${i+1}" style= ></div>`;
  }
  hydrationWidget.children[hydrationWidget.children.length - 1].style = `transform: skew(${degreeSkew}deg)`;
}

function addProgressWidgetSleep(info, degreeSkew, rectangleAmount) {
  innerDisplaySleep.innerText = `${info.percent.toFixed(2)}%
    ${info.userInfo} hours
    ${info.dayQuality} quality`;
  for (let i = 0; i < rectangleAmount; i++) {
    sleepWidget.innerHTML += `<div class= "rectangle-${i+1}" style= ></div>`;
  }
  sleepWidget.children[sleepWidget.children.length - 1].style = `transform: skew(${degreeSkew}deg)`;
}

function showSleepDisplay(user, repo) {
  let recentDate = repo.findRecentDate(user.id);
  let displayInfo = getRectangleDegree(repo.findDateData(user.id, recentDate, 'hours'), 8);
  displayInfo['dayQuality'] = `${repo.findDateData(user.id, recentDate, 'quality')}`;
  setProgressWidget(displayInfo, 'sleep');
}

function initialSetup() {
  userArray = userData.userData.map(person => new User(person));
  userRepo = new UserRepository(userArray);
  sleepRepo = new Sleep(sleepData.sleepData);
  hydrationRepo = new Hydration(hydrationData.hydrationData);
  randomUser = getRandomUser(userRepo.userData);
  displayUserInfo(randomUser, userRepo);
  showSleepDisplay(randomUser, sleepRepo);
  createHydrationDisplay(randomUser, hydrationRepo);
  createWaterChart(randomUser);
  createSleepWidget(randomUser);
}


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

function getRectangleDegree(userInfo, rec) {
  let percent = (userInfo / rec) * 100;
  let degree = 360 - (((percent * 360) / 100).toFixed(0));
  return {
    degree: degree,
    percent: percent,
    userInfo: userInfo
  };
}

function getDegreeSkew(rectangleAmount, info) {
  let degreeSkew = 0;
  if (rectangleAmount > 1) {
    degreeSkew = 90 - (info.degree - 90 * (rectangleAmount - 1));
  }
  return degreeSkew;
}

function getRandomUser(array) {
  let randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}
