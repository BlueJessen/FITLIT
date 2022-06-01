
class Hydration {
constructor(userStats) {
this.userData = userStats;
}
findUser(id) {
  let userInfo = this.userData.reduce((acc,user) => {
    if(id === user.userID) {
      acc.push(user);
    }
    return acc
  },[]);
  return userInfo;
}

findDayHydration(id, date) {
  let userHydration = this.findUser(id);
  let day = userHydration.find(data => date === data.date);
  return day.numOunces;
}

findRecentDate(id) {
  return this.findUser(id).slice(-1)[0].date
}

findWeeklyHydration(id, date) {
  let userHydration = this.findUser(id);
  let dayIndex = userHydration.findIndex(data => date === data.date);
  const toDate = userHydration.slice(0 , (dayIndex+1));
  let result = toDate.slice(-7).map(day => day.numOunces);
  return result;
}
}

export default Hydration;
