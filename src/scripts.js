import './css/styles.css';
import {
  allData,
  postUserCall,
  checkForError
} from './apiCalls';
import {
createWaterChart,
createSleepChart,
createActivityChart
} from './chartFunctions';
import Chart from 'chart.js/auto';
import CircleProgress from 'js-circle-progress';
import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import Widget from './Widget';

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
let errorHydration= document.querySelector('.error-hydration');
let submitFormH = document.getElementById('submitHydration');
let hydrationDate = document.getElementById('calendarHydration');
let hydrationInput = document.getElementById('hydration');
//LINEBREAK(FOR FORM SLEEP)--------------
let errorSleep= document.querySelector('.error-sleep');
let submitFormS = document.getElementById('submitSleep');
let sleepDate = document.getElementById('calendarSleep');
let hoursSlept = document.getElementById('sleepHours');
let sleepQuality = document.getElementById('sleepQuality');
//LINEBREAK(FOR FORM ACTIVITY)--------------
let errorActive= document.querySelector('.error-active');
let submitFormA = document.getElementById('submitActive');
let activeDate = document.getElementById('calendarActive');
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
window.addEventListener('load', loadData);

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
  addProgressWidgetSleep(event.target.id);
}else if(event.target.classList.contains('activity')){
  toggleActivity(event.target);
  showActivityDisplay(event.target.id);
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

function addProgressWidgetHydration() {
  const hydrationProgress = new CircleProgress(hydrationCircle);
  const hydrationWidget = new Widget(randomUser, hydrationRepo, 'hydration', hydrationProgress);
  hydrationWidget.findWidgetType();
}

function addProgressWidgetSleep(type) {
  const sleepProgress = new CircleProgress(sleepCircle);
  const sleepWidget = new Widget(randomUser, sleepRepo, 'sleep', sleepProgress, type);
  sleepWidget.findWidgetType();
  setText('sleep', type);
}

function setText(type, dataType) {
if(type === 'sleep') {
      widgetTextSleep.innerText = `Sleep ${dataType}`;
    }else{
      widgetTextActive.innerText = `Activity: ${dataType}`;
    }
}

function showActivityDisplay (target) {
  const activityProgress = new CircleProgress(activityCircle);
  const activityWidget = new Widget(randomUser,activityRepo, 'activity', activityProgress, target);
  activityWidget.findWidgetType();
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

function initialSetup(first) {
  userArray = userData.userData.map(person => new User(person));
  userRepo = new UserRepository(userArray);
  sleepRepo = new Sleep(sleepData.sleepData);
  hydrationRepo = new Hydration(hydrationData.hydrationData);
  activityRepo = new Activity(activityData.activityData);
  if (first) {
  randomUser = getRandomUser(userRepo.userData);
  }

  displayUserInfo(randomUser, userRepo);
  addProgressWidgetSleep('hours');
  addProgressWidgetHydration();
  clickWaterBtn();
  showActivityDisplay('steps');
}

function clickWaterBtn() {
  createWaterChart(randomUser, hydrationRepo);
  waterBtn.classList.add('hidden');
  sleepBtn.classList.remove('hidden');
  activityBtn.classList.remove('hidden');
};

function clickSleepBtn() {
  createSleepChart(randomUser, sleepRepo)
  sleepBtn.classList.add('hidden');
  waterBtn.classList.remove('hidden');
  activityBtn.classList.remove('hidden');
};

function clickActivityBtn() {
  createActivityChart(randomUser, activityRepo);
  activityBtn.classList.add('hidden');
  sleepBtn.classList.remove('hidden');
  waterBtn.classList.remove('hidden');
};

//data functions -----------------------

function loadData() {
  allData.then(data => {
    userData = data[0];
    sleepData = data[1];
    activityData = data[2];
    hydrationData = data[3];
    initialSetup(true);
  }).catch(error => console.log(error))
};


function reloadData(formType) {
  allData.then(data => {
    userData = data[0];
    sleepData = data[1];
    activityData = data[2];
    hydrationData = data[3];
    initialSetup();
    if (formType === 'active') {
      clickActivityBtn()
    } else if (formType === 'hydration') {
      clickWaterBtn()
    } else if (formType === 'sleep') {
      clickSleepBtn()
    }
  }).catch(error => console.log(error))
};

function getRandomUser(array) {
  let randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

function submitHydrationForm() {
  event.preventDefault();
  if(sleepDate.value === '' || hoursSlept.value === '' || sleepQuality.value === '' ) {
    errorHydration.classList.remove('hidden');
  }
  let hydrationObj = { userID: randomUser.id, date: reformatDate(hydrationDate.value), numOunces: hydrationInput.value }
  postUserCall(hydrationObj, 'hydration').then(response => reloadData('hydration'))
}

function submitSleepForm() {
  event.preventDefault();
  if(sleepDate.value === '' || hoursSlept.value === '' || sleepQuality.value === '' ) {
    errorSleep.classList.remove('hidden');
  }
  let sleepObj = { userID: randomUser.id, date: reformatDate(sleepDate.value), hoursSlept: hoursSlept.value, sleepQuality: sleepQuality.value }
  console.log(sleepObj)
  postUserCall(sleepObj, 'sleep').then(response => reloadData('sleep'))
}

function submitActiveForm() {
  event.preventDefault();
  if(activeDate.value === '' || numSteps.value === '' || minutesActive.value === '' || flightsOfStairs.value === '') {
    errorActive.classList.remove('hidden');
  }
  let activeObj = { userID: randomUser.id, date: reformatDate(activeDate.value), numSteps: numSteps.value, minutesActive: minutesActive.value, flightsOfStairs: flightOfStairs.value }
  console.log(activeObj)
  postUserCall(activeObj, 'activity').then(response => reloadData('active'))
}

function reformatDate(date) {
  return date.split('-').join('/');
}
