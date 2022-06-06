import Chart from 'chart.js/auto';
import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';

import {
  allData
} from './apiCalls';

let userData = [];
let sleepData = [];
let activityData = [];
let hydrationData = [];
var ctx = document.getElementById('chart').getContext('2d');
let chart

window.addEventListener('load', () => {
  allData.then(data => {
    userData = data[0];
    sleepData = data[1];
    activityData = data[2];
    hydrationData = data[3];
  }).catch(error => console.log(error))
});

function createWaterChart(user, hydrationRepo) {
  Object.keys(Chart.instances).forEach(chartID => Chart.instances[chartID].destroy());
  console.log(hydrationRepo)
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: hydrationRepo.findWeeklyDates(user.id, hydrationRepo.findRecentDate(user.id)),
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

function createSleepWidget(user, sleepRepo) {
  Object.keys(Chart.instances).forEach(chartID => Chart.instances[chartID].destroy());
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: sleepRepo.findWeeklyDates(user.id, sleepRepo.findRecentDate(user.id)),
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

function createActivityChart(user, activityRepo) {
  Object.keys(Chart.instances).forEach(chartID => Chart.instances[chartID].destroy());
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: activityRepo.findWeeklyData(user.id, activityRepo.findRecentDate(user.id), 'date'),
      datasets: [{
        label: `${user.name}'s daily minutes active`,
        data: activityRepo.findWeeklyData(user.id, activityRepo.findRecentDate(user.id), 'minutesActive'),
        backgroundColor: [
          'rgba(0, 39, 44, 0.88)',
        ],
        borderColor: 'rgba(0, 39, 44, 0.88)',
        borderWidth: 2
      }, {
        label: `${user.name}'s daily stairs climbed`,
        data: activityRepo.findWeeklyData(user.id, activityRepo.findRecentDate(user.id), 'flightsOfStairs'),
        backgroundColor: [
          'rgba(249, 130, 0, 0.8)',
        ],
        borderColor: 'rgba(249, 130, 0, 0.8)',
        borderWidth: 2

      }, {
        label: `${user.name}'s daily steps (in hundreds)`,
        data: activityRepo.findWeeklyData(user.id, activityRepo.findRecentDate(user.id), 'numSteps').map(steps => steps/100),
        backgroundColor: [
          'rgba(249, 88, 38, 0.8)',
        ],
        borderColor: 'rgba(249, 88, 38, 0.8)',
        borderWidth: 2

      }
    ]
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

export {createWaterChart, createSleepWidget, createActivityChart};
