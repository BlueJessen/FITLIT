import Chart from 'chart.js/auto';
import UserRepository from './UserRepository';
import User from './User';
import Hydration from './Hydration';
import Sleep from './Sleep';

import {
  allData
} from './apiCalls';

let userData = [];
let sleepData = [];
let activityData = [];
let hydrationData = [];

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

export {createWaterChart, createSleepWidget};
