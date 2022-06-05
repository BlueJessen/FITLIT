import { expect } from 'chai';
import UserRepository from '../src/UserRepository.js';
import User from '../src/User.js';
import Hydration from '../src/Hydration.js';

describe('Hydration', () => {
  let hydrationRepo = [];
  beforeEach( () => {
    hydrationRepo = new Hydration([{"userID":49,"date":"2020/01/14","numOunces":87},{"userID":50,"date":"2020/01/14","numOunces":41},{"userID":48,"date":"2020/01/15","numOunces":62},{"userID":49,"date":"2020/01/15","numOunces":57},{"userID":50,"date":"2020/01/15","numOunces":89},{"userID":49,"date":"2020/01/16","numOunces":71},{"userID":50,"date":"2020/01/16","numOunces":43},{"userID":49,"date":"2020/01/17","numOunces":68},{"userID":50,"date":"2020/01/17","numOunces":49},{"userID":49,"date":"2020/01/18","numOunces":55},{"userID":50,"date":"2020/01/18","numOunces":77},{"userID":49,"date":"2020/01/19","numOunces":52},{"userID":50,"date":"2020/01/19","numOunces":85},{"userID":49,"date":"2020/01/20","numOunces":37},{"userID":50,"date":"2020/01/20","numOunces":91},{"userID":49,"date":"2020/01/21","numOunces":38},{"userID":50,"date":"2020/01/21","numOunces":32},{"userID":49,"date":"2020/01/22","numOunces":36},{"userID":50,"date":"2020/01/22","numOunces":22}])
  });
  it('should be a function', function () {
    expect(Hydration).to.be.a('function');
  });
  it('should be an instance of Hydration', function () {

    expect(hydrationRepo).to.be.an.instanceof(Hydration);
  });

  it('should be able to find the most recent date', function () {
    expect(hydrationRepo.findRecentDate(50)).to.equal("2020/01/22");
  });
  it("should be able to find a user's info", function () {
    expect(hydrationRepo.findUser(49)).to.deep.equal([{"userID":49,"date":"2020/01/14","numOunces":87},{"userID":49,"date":"2020/01/15","numOunces":57},{"userID":49,"date":"2020/01/16","numOunces":71},{"userID":49,"date":"2020/01/17","numOunces":68},{"userID":49,"date":"2020/01/18","numOunces":55},{"userID":49,"date":"2020/01/19","numOunces":52},{"userID":49,"date":"2020/01/20","numOunces":37},{"userID":49,"date":"2020/01/21","numOunces":38},{"userID":49,"date":"2020/01/22","numOunces":36},])
  });
  it("should be able to find how much a user drank on a certain day", function () {
    expect(hydrationRepo.findDateData(50,"2020/01/16")).to.equal(43)
  });
  it("should be able to find how much a user drank each day for a week", function () {
    expect(hydrationRepo.findWeeklyData(49,"2020/01/22")).to.deep.equal([71, 68, 55, 52, 37, 38, 36]);
  });

});
