class User {
  constructor(userObject) {
    this.id = userObject.id
    this.name = userObject.name
    this.address = userObject.address
    this.email = userObject.email
    this.strideLength = userObject.strideLength
    this.dailyStepGoal = userObject.dailyStepGoal
    this.friends = userObject.friends
  }
  returnUserName() {
    return this.name.split(' ')[0];
  }
}

export default User;
