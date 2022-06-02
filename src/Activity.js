class Activity {
  constructor(userInfo) {
    this.activityRepo = userInfo;
    this.mile = 5280; //1 mile in feet
  }

  findUser(userID) {
    return this.activityRepo.find(user => user.userID === userID);
  };

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
 }


  export default Activity;
