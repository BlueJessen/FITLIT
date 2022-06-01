import { expect } from 'chai';
import UserRepository from '../src/UserRepository.js';
import User from '../src/User.js';
import Activity from '../src/activity.js';

describe('Activity', () => {
  let actibityRepo = [];
  beforeEach( () => {
    hydrationRepo = new Hydration([{"userID":7,"date":"2020/01/13","numSteps":1503,"minutesActive":542,"flightsOfStairs":40}, {"userID":7,"date":"2020/01/14","numSteps":2503,"minutesActive":2,"flightsOfStairs":27},{"userID":7,"date":"2020/01/15","numSteps":3503,"minutesActive":261,"flightsOfStairs":32},{"userID":7,"date":"2020/01/16","numSteps":4403,"minutesActive":621,"flightsOfStairs":18},{"userID":7,"date":"2020/01/17","numSteps":2203,"minutesActive":126,"flightsOfStairs":70},{"userID":7,"date":"2020/01/18","numSteps":5503,"minutesActive":162,"flightsOfStairs":105},{"userID":7,"date":"2020/01/19","numSteps":1111,"minutesActive":333,"flightsOfStairs":1},{"userID":7,"date":"2020/01/20","numSteps":2222,"minutesActive":512,"flightsOfStairs":33},{"userID":7,"date":"2020/01/21","numSteps":2323,"minutesActive":8,"flightsOfStairs":40},{"userID":7,"date":"2020/01/22","numSteps":3232,"minutesActive":88,"flightsOfStairs":8},{"userID":90,"date":"2020/01/13","numSteps":5031,"minutesActive":362,"flightsOfStairs":4},])
  });
  it('should be a function', function () {
    expect(Activity).to.be.a('function');
  });
  it('should be an instance of Hydration', function () {

    expect(hydrationRepo).to.be.an.instanceof(Activity);
  });

  it('should be able to find the most recent date', function () {
    expect(hydrationRepo.findRecentDate(7)).to.equal("2020/01/22");
  });
  it("should be able to find a user's info", function () {
    expect(hydrationRepo.findUser(49)).to.deep.equal([{"userID":49,"date":"2020/01/14","numOunces":87},{"userID":49,"date":"2020/01/15","numOunces":57},{"userID":49,"date":"2020/01/16","numOunces":71},{"userID":49,"date":"2020/01/17","numOunces":68},{"userID":49,"date":"2020/01/18","numOunces":55},{"userID":49,"date":"2020/01/19","numOunces":52},{"userID":49,"date":"2020/01/20","numOunces":37},{"userID":49,"date":"2020/01/21","numOunces":38},{"userID":49,"date":"2020/01/22","numOunces":36},])
  });
  it("should be able to find how much a user drank on a certain day", function () {
    expect(hydrationRepo.findDayHydration(50,"2020/01/16")).to.equal(43)
  });
  it("should be able to find how much a user drank each day for a week", function () {
    expect(hydrationRepo.findWeekHydration(49,"2020/01/22")).to.deep.equal([71, 68, 55, 52, 37, 38, 36]);
  });

});
