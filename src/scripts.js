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
  allData.then( data =>{
    userData = data[0];
    sleepData = data[1];
    activityData = data[2];
    hydrationData = data[3];
    initialSetup();

  }).catch(error => console.log(error))
});

sleepBtn.addEventListener('click', clickSleepBtn);
waterBtn.addEventListener('click', clickWaterBtn);

function getRandomUser(array) {
  let randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
}

function userToDisplay(user, repo) {
  name.innerHTML = `Welcome ${user.returnUserName()}!`;
  userCard.innerHTML = `
    <div class='user-info'> ${user.address}</div>
    <div class='user-info'> ${user.email}</div>
    <div class='user-info'> Stride Count: ${user.strideLength}</div>
    <div class='user-info'> Daily Step Goal: ${user.dailyStepGoal}</div>`;
  if (user.dailyStepGoal > repo.getAverage()) {
    userCard.innerHTML +=  `<div class='user-info'> Your average step goal is ${user.dailyStepGoal -repo.getAverage()} over the average of ${repo.getAverage()}! Great work!</div>`
  } else {
    userCard.innerHTML +=  `<div class='user-info'> Your average step goal is ${repo.getAverage() - user.dailyStepGoal} under the average of ${repo.getAverage()}! You can STEP it up!</div>`
  }
  populateFriends(user);
};

function populateFriends(user) {
  userFriends.innerHTML = `<div> Friends: ${user.friends}</div>`;
}

function hydrationDisplay (user, repo) {
  //should drink 85 fl oz a day
  let recentDate = '2020/01/22';
  let displayInfo = getRectangleDegree(repo.findDayHydration(user.id, recentDate), 85);
  setProgressWidget(displayInfo, 'hydration');
}

//Gets degree out of 360 the rectangle should cover and percent intake user has done vs reccomendation
function getRectangleDegree(userInfo, rec){
  let percent = (userInfo/rec)*100;
  let degree = ((percent*360)/100).toFixed(0);
  degree = 360 - degree;
  return {degree: degree, percent: percent, userInfo: userInfo};
}

function setProgressWidget(info, type) {
  let rectangleAmount = Math.ceil(info.degree/90);//rounds up
  let degreeSkew = 0;
  if (rectangleAmount > 1){
    degreeSkew = info.degree - 90*(rectangleAmount-1);
    degreeSkew = 90-degreeSkew;
  }
  if(type === 'hydration') {
    innerDisplayHydration.innerText = `${info.percent.toFixed(2)}%
    ${info.userInfo} fl oz`;
  for(let i =0; i<rectangleAmount; i++){
    //HTML STUFF
  hydrationWidget.innerHTML += `<div class= "rectangle-${i+1}" style= ></div>`;
  }
    hydrationWidget.children[  hydrationWidget.children.length-1].style = `transform: skew(${degreeSkew}deg)`;
  } else if(type === 'sleep') {
    innerDisplaySleep.innerText = `${info.percent.toFixed(2)}%
      ${info.userInfo} hours
      ${info.dayQuality} quality`;
    for(let i =0; i<rectangleAmount; i++){
      //HTML STUFF
    sleepWidget.innerHTML += `<div class= "rectangle-${i+1}" style= ></div>`;
    }
    sleepWidget.children[sleepWidget.children.length-1].style = `transform: skew(${degreeSkew}deg)`;
  }
}

function sleepDisplay(user, repo) {
  let recentDate = '2020/01/22';
  //   All time average (Quality): ${repo.findAverageSleepQuality(user.id)}`;
  // console.log(repo.findWeeklySleepQuality(user.id, recentDate));
  // sleepWidget.innerText = `Latest sleep data (Hours): ${repo.findDaySleepHours(user.id, recentDate)}
  // Latest sleep data (Quality): ${repo.findDaySleepQuality(user.id, recentDate)}
  //  Weekly average (Hours): ${repo.findWeeklySleepHours(user.id, recentDate)}
  //  Weekly average (Quality): ${repo.findWeeklySleepQuality(user.id, recentDate)}
  //   All time average (Hours): ${repo.findAverageSleepHours(user.id)}
    let displayInfo = getRectangleDegree(repo.findDaySleepHours(user.id, recentDate), 8);
    displayInfo['dayQuality'] = `${repo.findDaySleepQuality(user.id, recentDate)}`;
    setProgressWidget(displayInfo, 'sleep');
}

function initialSetup () {
    userArray = userData.userData.map(person => new User(person));
    userRepo = new UserRepository(userArray);
    sleepRepo = new Sleep(sleepData.sleepData);
    hydrationRepo = new Hydration(hydrationData.hydrationData);
    randomUser = getRandomUser(userRepo.userData);
    userToDisplay(randomUser, userRepo);
    sleepDisplay(randomUser, sleepRepo);
    hydrationDisplay(randomUser, hydrationRepo);
    createWaterChart(randomUser);
    createSleepWidget(randomUser);
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
              data: hydrationRepo.findWeekHydration(user.id, "2020/01/22"),
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
})};

function createSleepWidget(user) {
  const ctx = document.getElementById('sleepChart').getContext('2d');
  let sleepRepo  = new Sleep(sleepData.sleepData);
  new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
            label: `${user.name}'s Sleep Time in Hours`,
              data: sleepRepo.findWeeklySleepHours(user.id, "2020/01/22"),
            backgroundColor: [
              'rgba(0, 39, 44, 0.88)',
            ],
            borderColor:'rgba(0, 39, 44, 0.88)',
            borderWidth: 2
        }, {  label: `${user.name}'s Sleep Quality`,
            data: sleepRepo.findWeeklySleepQuality(user.id, "2020/01/22"),
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
})};

function clickWaterBtn() {
  console.log('what?')
  sleepChart.classList.add('hidden')
  waterBtn.classList.add('hidden')
  waterChart.classList.remove('hidden')
  sleepBtn.classList.remove('hidden')
};

function clickSleepBtn() {
    console.log('what?')
    waterChart.classList.add('hidden')
    sleepBtn.classList.add('hidden')
    sleepChart.classList.remove('hidden')
    waterBtn.classList.remove('hidden')

};
