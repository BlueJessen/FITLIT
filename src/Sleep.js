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

  findAverage(userID, type) {
    const userData = this.findAllUserData(userID);
    const average = userData.reduce((total, dataEntry) => {
      return type === 'hours' ? total += dataEntry.sleepQuality: total += dataEntry.hoursSlept;
    }, 0)/userData.length;
    return parseFloat(average.toFixed(1));
  };

  findDateData(userID, date, type) {
    return type === 'hours' ? this.sleepData.find(userData => userID === userData.userID && date === userData.date).hoursSlept :
      this.sleepData.find(userData => userID === userData.userID && date === userData.date).sleepQuality;
  };

  findRecentDate(id) {
    return this.findAllUserData(id).slice(-1)[0].date;
  }

  findWeeklyData(userID, date, type) {
    const userData = this.findAllUserData(userID);
    const dayIndex = userData.findIndex(dataEntry => dataEntry.date === date);
    const toDate = userData.slice(0 , (dayIndex+1));
    return type === 'hours' ? toDate.slice(-7).map(date => date.hoursSlept) :
    toDate.slice(-7).map(date => date.sleepQuality);
  }

  findWeeklyDates(userID, date) {
    const userData = this.findAllUserData(userID);
    const dayIndex = userData.findIndex(dataEntry => dataEntry.date === date);
    const toDate = userData.slice(0 , (dayIndex+1));
    return toDate.slice(-7).map(date => date.date);
  }

  findAllAverageSleepQuality() {
    let averageSleepQuality = this.sleepData.reduce((acc, dataEntry) => acc+=dataEntry.sleepQuality, 0)/this.sleepData.length;
    return Number(averageSleepQuality.toFixed(1))
  };

};

export default Sleep;
