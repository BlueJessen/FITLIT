class UserRepository {
  constructor(userArray) {
    this.userData = userArray
  };
  findUser(id) {
    return this.userData.find(user => id === user.id);
  };
  getAverage() {
    const totalSteps = this.userData.reduce((a, user) => {
      a += user.dailyStepGoal;
      return a;
    }, 0);
    return Math.floor(totalSteps / this.userData.length)
  };
};

export default UserRepository;
