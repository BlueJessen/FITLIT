import './css/styles.css';
import {
  allData
} from './apiCalls';
import {
createWaterChart,
createSleepWidget,
createActivityChart
} from './chartFunctions';
import Chart from 'chart.js/auto';
import CircleProgress from 'js-circle-progress';
import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import Activity from './Activity';


// query selectors -----------------------

let userCard = document.querySelector('.user-card');
let userFriends = document.querySelector('.user-friends');
let name = document.querySelector('#name');
let hydrationWidget = document.querySelector('.hydration');
let sleepWidget = document.querySelector('.sleep');
let innerDisplayHydration = document.querySelector('.inner-hydration');
let innerDisplaySleep = document.querySelector('.inner-sleep');
let sleepBtn = document.querySelector('.sleepBtn');
let waterBtn = document.querySelector('.waterBtn');
let hydrationCircle =document.querySelector('.progress-hydration');
let sleepCircle = document.querySelector('.progress-sleep');
let activityCircle = document.querySelector('.progress-activity');
let widgetTabs = document.querySelector('#widget');
let activityBtn = document.querySelector('.activityBtn');
let ctx = document.getElementById('chart').getContext('2d');


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
let activityRepo;
let chart = new Chart(ctx, {
    type: 'line'
});

const activityProgress = new CircleProgress(activityCircle)
//EVENT LISTENERS -----------------------
widgetTabs.addEventListener('click', getTarget(event));
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
activityBtn.addEventListener('click', clickActivityBtn);

//Dom functions -----------------------

function getTarget(target){
  console.log(target);
}

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

function addProgressWidgetSleep(user, repo, target) {
  const sleepProgress = new CircleProgress(sleepCircle);
  let recentDate = repo.findRecentDate(user.id);
  let displayInfo = repo.findDateData(user.id, recentDate, 'hours');
  sleepProgress.max = 8;
  sleepProgress.value = displayInfo;
}

function showActivityDisplay (user, repo, target) {
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
  showActivityDisplay(randomUser, activityRepo);
}

function clickWaterBtn() {
  createWaterChart(randomUser);
  waterBtn.classList.add('hidden');
  sleepBtn.classList.remove('hidden');
  activityBtn.classList.remove('hidden');
};

function clickSleepBtn() {
  createSleepWidget(randomUser)
  sleepBtn.classList.add('hidden');
  waterBtn.classList.remove('hidden');
  activityBtn.classList.remove('hidden');
};

function clickActivityBtn() {
  createActivityChart(randomUser);
  activityBtn.classList.add('hidden');
  sleepBtn.classList.remove('hidden');
  waterBtn.classList.remove('hidden');
};

//data functions -----------------------

function getRandomUser(array) {
  let randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}
