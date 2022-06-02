class UserRepository {
  constructor(userArray) {
    this.userData = userArray
  };
  findUser(id) {
    return this.userData.find(user => id === user.id);
  };
  getAverageSteps() {
    const totalSteps = this.userData.reduce((total, user) => {
      total += user.dailyStepGoal;
      return total;
    }, 0);
    return Math.floor(totalSteps / this.userData.length)
  };
};

export default UserRepository;
