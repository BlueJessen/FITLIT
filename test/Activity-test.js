import { expect } from 'chai';
import UserRepository from '../src/UserRepository.js';
import User from '../src/User.js';
import Activity from '../src/Activity.js';
import { activityData } from './test-data.js';
import { userData } from './test-data.js';

describe('Activity', () => {
  let activityRepo = [];
  let userRepo = [];
  beforeEach( () => {
    activityRepo = new Activity(activityData);
    let userArray = userData.map(user => new User(user));
    userRepo = new UserRepository(userArray);
  });

  it('should be a function', function () {
    expect(Activity).to.be.a('function');
  });

  it('should be an instance of Activity', function () {
    expect(activityRepo).to.be.an.instanceof(Activity);
  });

  it('should be able to find the miles walked on a date', function () {
    expect(activityRepo.milesWalked(7, "2020/01/22", userRepo)).to.equal(1.8);
    expect(activityRepo.milesWalked(7, "2020/01/21", userRepo)).to.equal(1.3);
  });

  it('should be able to find the minutes active on a date', function () {
    expect(activityRepo.minutesActive(7, "2020/01/22")).to.equal(88);
    expect(activityRepo.minutesActive(7, "2020/01/21")).to.equal(8);
  });

  it('should be able to find the average minutes active on a week', function () {
    expect(activityRepo.weeklyActivityAverage(7, "2020/01/22")).to.equal(264);
    expect(activityRepo.weeklyActivityAverage(7, "2020/01/21")).to.equal(289);
  });

  it('should be able to find if a user reached their step goal on a date', function () {
    expect(activityRepo.stepGoalReached(7, "2020/01/22", userRepo)).to.equal(false);
    expect(activityRepo.stepGoalReached(7, "2020/01/18", userRepo)).to.equal(true);
  });

  it('should be able to find all days a user exceeded their step goal', function () {
    expect(activityRepo.daysStepGoalReached(7, userRepo)).to.deep.equal(["2020/01/14", "2020/01/18"]);
    expect(activityRepo.daysStepGoalReached(90, userRepo)).to.deep.equal(["2020/01/13"]);
  });

  it('should be able to find the most stairs a user climbed in a day', function () {
    expect(activityRepo.maxStairs(7)).to.equal(105);
    expect(activityRepo.maxStairs(90)).to.equal(4);
  });

  it.only('should be able to find the average stairs climbed on a day', function () {
    expect(activityRepo.averageStairs("2020/01/13")).to.equal(22);
  });

  it.skip('should be able to find the average steps taken on a day', function () {
    expect(activityRepo.averageSteps("2020/01/13")).to.equal(3267);
  });

  it.skip('should be able to find the average minutes active on a day', function () {
    expect(activityRepo.averageActivity("2020/01/13")).to.equal(452);
  });

});
