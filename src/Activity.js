class Activity {
  constructor(userInfo) {
    this.activityRepo = userInfo;
    this.mile = 5280; //1 mile in feet
  }

  findUser(userID) {
    return this.activityRepo.find(user => user.userID === userID);
  };

  findRecentDate(id) {
    return this.findAllUserData(id).slice(-1)[0].date
  }

  findAllUserData(userID) {
    return this.activityRepo.filter(user => user.userID === userID);
  };

  milesWalked(userID, date, userRepo) {
  let strideLength = userRepo.findUser(userID).strideLength;
  let dataSet = this.findAllUserData(userID);
  let steps = dataSet.find(day => day.date === date).numSteps;
  return parseFloat(((steps*strideLength)/this.mile).toFixed(1));
  }

  minutesActive(userID, date) {
      let dataSet = this.findAllUserData(userID);
      return dataSet.find(day => day.date === date).minutesActive;
  }

  weeklyActivityAverage(userID, date) {
      const dataSet = this.findAllUserData(userID);
      const dayIndex = dataSet.findIndex(data => date === data.date);
      const toDate = dataSet.slice(0 , (dayIndex+1));
      const result = toDate.slice(-7).reduce((sum, day) => {
        sum += day.minutesActive;
        return sum;
      }, 0);
      return parseInt(result/7);
  }

  weeklyActivity(userID, date) {
      const dataSet = this.findAllUserData(userID);
      const dayIndex = dataSet.findIndex(data => date === data.date);
      const toDate = dataSet.slice(0 , (dayIndex+1));
      const result = toDate.slice(-7);
      return result.map(day => day.minutesActive);
  }

  weeklyStairs(userID, date) {
      const dataSet = this.findAllUserData(userID);
      const dayIndex = dataSet.findIndex(data => date === data.date);
      const toDate = dataSet.slice(0 , (dayIndex+1));
      const result = toDate.slice(-7);
      return result.map(day => day.flightsOfStairs);
  }

  weeklySteps(userID, date) {
      const dataSet = this.findAllUserData(userID);
      const dayIndex = dataSet.findIndex(data => date === data.date);
      const toDate = dataSet.slice(0 , (dayIndex+1));
      const result = toDate.slice(-7);
      return result.map(day => day.numSteps);
  }


  stepGoalReached(userID, date, userRepo) {
      const goal = userRepo.findUser(userID).dailyStepGoal;
      const dataSet = this.findAllUserData(userID);
      const steps = dataSet.find(day => day.date === date).numSteps;
      return goal < steps || goal === steps ? true : false;
  }

  daysStepGoalReached(userID, userInfo) {
        let goal = userInfo.findUser(userID);
        goal = goal.dailyStepGoal;
        const dataSet = this.findAllUserData(userID);
        let daysGoalReached = dataSet.reduce((dates, day) => {
          if (day.numSteps > goal || day.numSteps === goal) {
            dates.push(day.date);
            }
            return dates;
        },[])
        return daysGoalReached;
  }

  maxStairs(userID) {
      const dataSet = this.findAllUserData(userID);
      let sortedSet = dataSet.sort((day, nextDay) => {
      return nextDay.flightsOfStairs - day.flightsOfStairs;
      });
    return sortedSet[0].flightsOfStairs
  }

  averageStairs(date) {
    const usersOnDate = this.activityRepo.filter(user => user.date === date);
    return usersOnDate.reduce((sum, day) => {
      sum += day.flightsOfStairs;
      return sum;
    },0)/usersOnDate.length;
  }

  averageSteps(date) {
    const usersOnDate = this.activityRepo.filter(user => user.date === date);
    return usersOnDate.reduce((sum, day) => {
      sum += day.numSteps;
      return sum;
    },0)/usersOnDate.length;

  }

  averageActivity(date) {
    const usersOnDate = this.activityRepo.filter(user => user.date === date);
    return usersOnDate.reduce((sum, day) => {
      sum += day.minutesActive;
      return sum;
    },0)/usersOnDate.length;
  }


 }


  export default Activity;
