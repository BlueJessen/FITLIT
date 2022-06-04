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
var ctx = document.getElementById('waterChart').getContext('2d');
let chart

window.addEventListener('load', () => {
  allData.then(data => {
    userData = data[0];
    sleepData = data[1];
    activityData = data[2];
    hydrationData = data[3];
  }).catch(error => console.log(error))
});

function createWaterChart(user) {
  Object.keys(Chart.instances).forEach(chartID => Chart.instances[chartID].destroy());
  let hydrationRepo = new Hydration(hydrationData.hydrationData);
  chart = new Chart(ctx, {
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
  Object.keys(Chart.instances).forEach(chartID => Chart.instances[chartID].destroy());
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

function createActivityChart(user) {
  Object.keys(Chart.instances).forEach(chartID => Chart.instances[chartID].destroy());
  let activityRepo = new Activity(activityData.activityData);
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [{
        label: `${user.name}'s daily minutes active`,
        data: activityRepo.weeklyActivity(user.id, activityRepo.findRecentDate(user.id)),
        backgroundColor: [
          'rgba(0, 39, 44, 0.88)',
        ],
        borderColor: 'rgba(0, 39, 44, 0.88)',
        borderWidth: 2
      }, {
        label: `${user.name}'s daily stairs climbed`,
        data: activityRepo.weeklyStairs(user.id, activityRepo.findRecentDate(user.id)),
        backgroundColor: [
          'rgba(249, 130, 0, 0.8)',
        ],
        borderColor: 'rgba(249, 130, 0, 0.8)',
        borderWidth: 2

      }, {
        label: `${user.name}'s daily steps (in hundreds)`,
        data: activityRepo.weeklySteps(user.id, activityRepo.findRecentDate(user.id)).map(steps => steps/100),
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

// Creating the Activity chart requires a few new methods for Activity.

// function createActivityChart(user, userRepo) {
//   Object.keys(Chart.instances).forEach(chartID => Chart.instances[chartID].destroy());
//   let activityRepo = new Activity(sleepData.sleepData);
//   chart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
//       datasets: [{
//         label: `${user.name}'s weekly activity in minutes`,
//         data: ActivityRepo.findWeeklyData(user.id, hydrationRepo.findRecentDate(user.id)),
//         backgroundColor: [
//           'rgba(23, 97, 85, .7)',
//         ],
//         borderWidth: 1
//       }]
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true
//         }
//       }
//     }
//   })
// };

export {createWaterChart, createSleepWidget, createActivityChart};
