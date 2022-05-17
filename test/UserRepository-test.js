import { expect } from 'chai'; //<- object destructuring
import UserRepository from '../src/UserRepository';
const data = userData.userData;

describe('User Repository', () => {
  it('should be a function', function () {
    expect(UserRepository).to.be.a('function');
  });

  it('should hold user data', () => {
    const userRepo = new UserRepository(data);
    expect(userRepo.userData).to.deep.equal(data);
  });

  it('should have a method to find user data by id', () => {
    const userRepo = new UserRepository(data);
    const user2 = {
        "id": 2,
        "name": "Jarvis Considine",
        "address": "30086 Kathryn Port, Ciceroland NE 07273",
        "email": "Dimitri.Bechtelar11@gmail.com",
        "strideLength": 4.5,
        "dailyStepGoal": 5000,
        "friends": [9, 18, 24, 19]
      }
    expect(userRepo.findUser(2).to.deep.equal(user2));
  });

  it('should have a method to check the average step goal amongst users', () => {
      const testData = [{"dailyStepGoal": 5000}, {"dailyStepGoal": 7000}, {"dailyStepGoal": 2000}];
      const userRepo = new UserRepository(testData);

      expect(userRepo.getAverage().to.equal(4666));
  });
});
