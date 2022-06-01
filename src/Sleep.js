class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  };

  findUser(userID) {
    return this.sleepData.find(user => user.userID === userID);
  };

  findAllUserData(userID) {
    return this.sleepData.filter(user => user.userID === userID);
  };

  findAverageSleepHours(userID) {
    const userData = this.findAllUserData(userID);
    const averageSleepHours = userData.reduce((total, dataEntry) => {
      total += dataEntry.hoursSlept;
      return total
    }, 0)/userData.length;
    return Number(averageSleepHours.toFixed(1));
  };

  findAverageSleepQuality(userID) {
    const userData = this.findAllUserData(userID);
    const averageSleepQuality = userData.reduce((total, dataEntry) => {
      total += dataEntry.sleepQuality;
      return total
    }, 0)/userData.length;
    return Number(averageSleepQuality.toFixed(1));
  };

  findDaySleepHours(userID, date) {
    return this.sleepData.find(userData => userID === userData.userID && date === userData.date).hoursSlept;
  };

  findDaySleepQuality(userID, date) {
    return this.sleepData.find(userData => userID === userData.userID && date === userData.date).sleepQuality;
  };

  findRecentDate(id) {
    return this.findAllUserData(id).slice(-1)[0].date;
  }

  findWeeklySleepHours(userID, date) {
    const userData = this.findAllUserData(userID);
    const dayIndex = userData.findIndex(dataEntry => dataEntry.date === date);
    const toDate = userData.slice(0 , (dayIndex+1));
    return toDate.slice(-7).map(date => date.hoursSlept);
  };

  findWeeklySleepQuality(userID, date) {
    const userData = this.findAllUserData(userID);
    const dayIndex = userData.findIndex(dataEntry => dataEntry.date === date);
    const toDate = userData.slice(0,(dayIndex+1));
    return toDate.slice(-7).map(date => date.sleepQuality);
  };

  findAllAverageSleepQuality() {
    let averageSleepQuality = this.sleepData.reduce((acc, dataEntry) => acc+=dataEntry.sleepQuality, 0)/this.sleepData.length;
    return Number(averageSleepQuality.toFixed(1))
  };

};

export default Sleep;
