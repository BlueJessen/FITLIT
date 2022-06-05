import './css/styles.css';
import {
  allData,
  postUserCall,
  checkForError
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

// query selectors -----------------------

let userCard = document.querySelector('.user-card');
let userFriends = document.querySelector('.user-friends');
let name = document.querySelector('#name');
let hydrationWidget = document.querySelector('.hydration');
// let sleepWidget = document.querySelector('.sleep');
let innerDisplayHydration = document.querySelector('.inner-hydration');
let innerDisplaySleep = document.querySelector('.inner-sleep');
let sleepBtn = document.querySelector('.sleepBtn');
let waterBtn = document.querySelector('.waterBtn');
let hydrationCircle =document.querySelector('.progress-hydration');
let sleepCircle = document.querySelector('.progress-sleep');
let activityCircle = document.querySelector('.progress-activity');
let widgetTabs = document.querySelector('.progress-holder');
let activityBtn = document.querySelector('.activityBtn');
let widgetBtns = document.querySelectorAll('.widget-button');
let ctx = document.getElementById('chart').getContext('2d');
let widgetTextActive = document.querySelector('.widget-text-active');
let widgetTextSleep = document.querySelector('.widget-text-sleep');
//FORM(QUERY SELECTOR)---------
//LINEBREAK(FOR FORM HYDRATION)--------------
let submitFormH = document.getElementById('submitHydration');
let hydrationDate = document.getElementById('calender');
let hydrationInput = document.getElementById('hydration');
//LINEBREAK(FOR FORM SLEEP)--------------
let submitFormS = document.getElementById('submitSleep');
let sleepDate = document.getElementById('calender');
let hoursSlept = document.getElementById('sleepHours');
let sleepQuality = document.getElementById('sleepQuality');
//LINEBREAK(FOR FORM ACTIVITY)--------------
let submitFormA = document.getElementById('submitActive');
let activeDate = document.getElementById('calender');
let numSteps = document.getElementById('numSteps');
let minutesActive = document.getElementById('minutesActive');
let flightOfStairs = document.getElementById('flightOfStairs');
//LINEBREAK(FOR TABS)--------------
let tabs = document.querySelector('.tabs-container');
let tabButton = document.querySelectorAll('.tab-button');
let contents = document.querySelectorAll('.content');

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
window.addEventListener('load', () => {
  allData.then(data => {
    userData = data[0];
    sleepData = data[1];
    activityData = data[2];
    hydrationData = data[3];
    initialSetup();

  }).catch(error => console.log(error))
});

widgetTabs.addEventListener('click', getEvent);
sleepBtn.addEventListener('click', clickSleepBtn);
waterBtn.addEventListener('click', clickWaterBtn);
activityBtn.addEventListener('click', clickActivityBtn);
submitFormH.addEventListener('click', submitHydrationForm);
submitFormS.addEventListener('click', submitSleepForm);
submitFormA.addEventListener('click', submitActiveForm);
tabs.addEventListener('click', changeTabs)

//Dom functions -----------------------

function getEvent(){
if(event.target.classList.contains('sleep')){
  toggleSleep(event.target);
  addProgressWidgetSleep(randomUser, sleepRepo, event.target.id);
}else if(event.target.classList.contains('activity')){
  toggleActivity(event.target);
  showActivityDisplay(randomUser, activityRepo, event.target.id);
}
}

function changeTabs() {
  let id = event.target.dataset.id;
  if (id) {
    tabButton.forEach(btn => {
      btn.classList.remove('active');
    });
    event.target.classList.add('active');

    contents.forEach(content => {
      content.classList.remove('active');
    });

    let element = document.getElementById(id);
    element.classList.add('active')
  }
}

//POST -------------------------
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

function addProgressWidgetSleep(user, repo, type) {
  const sleepProgress = new CircleProgress(sleepCircle);
  let recentDate = repo.findRecentDate(user.id);

  if (type === 'hours') {
  let displayInfo = repo.findDateData(user.id, recentDate, type)
  sleepProgress.max = 8;
  sleepProgress.value = displayInfo;
} else {
   let displayInfo = repo.findDateData(user.id, recentDate, type)
  sleepProgress.max = 10;
  sleepProgress.value = displayInfo;
}
setText('sleep', type);
}

function setText(type, dataType) {
if(type === 'sleep') {
      widgetTextSleep.innerText = `Sleep ${dataType}`;
    }else{
      widgetTextActive.innerText = `Activity: ${dataType}`;
    }
}

function showActivityDisplay (user, repo, target) {
  if(target === 'steps') {
    setUpSteps()
  }else if(target === 'minutes') {
    setUpMinutes()
  }else if(target === 'stairs') {
    setUpStairs()
  }
  setText('activity', target);
}

function toggleActivity(target) {
  widgetBtns.forEach((btn) => {
    if(btn.classList.contains('activity')) {
    btn.classList.remove('current');
  }
});
  target.classList.add('current');
}

function toggleSleep(target) {
  widgetBtns.forEach((btn) => {
    if(btn.classList.contains('sleep')){
    btn.classList.remove('current')
  }
});
  target.classList.add('current');
}

function setUpSteps(target) {
  const activityProgress = new CircleProgress(activityCircle)
  let recentDate = activityRepo.findRecentDate(randomUser.id);
  let displayInfo = activityRepo.findStepsForDate(randomUser.id, recentDate);
  activityProgress.constrain = false;
  activityProgress.max = randomUser.dailyStepGoal;
  activityProgress.value = displayInfo;
  activityProgress.textFormat = 'vertical';
}

function setUpMinutes() {
    const activityProgress = new CircleProgress(activityCircle);
    let recentDate = activityRepo.findRecentDate(randomUser.id);
    activityProgress.max = 30;
    activityProgress.value = activityRepo.minutesActive(randomUser.id, recentDate);
    activityProgress.constrain = false;
}

function setUpStairs() {
  const activityProgress = new CircleProgress(activityCircle);
  let recentDate = activityRepo.findRecentDate(randomUser.id);
  activityProgress.max = 100;
  activityProgress.value = activityRepo.stairsOnDate(randomUser.id, recentDate);
  activityProgress.constrain = false;
}

function initialSetup() {
  userArray = userData.userData.map(person => new User(person));
  userRepo = new UserRepository(userArray);
  sleepRepo = new Sleep(sleepData.sleepData);
  hydrationRepo = new Hydration(hydrationData.hydrationData);
  activityRepo = new Activity(activityData.activityData);
  randomUser = getRandomUser(userRepo.userData);

  displayUserInfo(randomUser, userRepo);
  addProgressWidgetSleep(randomUser, sleepRepo, 'hours');
  addProgressWidgetHydration(randomUser, hydrationRepo);
  createWaterChart(randomUser);
  showActivityDisplay(randomUser, activityRepo, 'steps');
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

function reformatDate(date) {
  let dateArray = date.split(-);
  let formatedDate = [];
  formatedDate.push(dateArray[1]);
  formatedDate.push(dateArray[2]);
  formatedDate.push(dateArray[0]);
  return formatedDate.join('/');
  
function submitHydrationForm() {
  event.preventDefault();
  let hydrationObj = { userID: randomUser.id, date: reformatDate(hydrationDate.value), numOunces: hydrationInput.value }
  postUserCall(hydrationObj, 'hydration')
}

function submitSleepForm() {
  event.preventDefault();
  let sleepObj = { userID: randomUser.id, date: reformatDate(sleepDate.value), hoursSlept: hoursSlept.value, sleepQuality: sleepQuality.value }
  postUserCall(sleepObj, 'sleep')
}

function submitActiveForm() {
  event.preventDefault();
  let activeObj = { userID: randomUser.id, date: reformatDate(activeDate.value), numSteps: numSteps.value, minutesActive: minutesActive.value, flightOfStairs: flightOfStairs.value }
  postUserCall(activeObj, 'activity')
}

function reformatDate(date) {
  return date.split('-').join('/');
}
