import { expect } from 'chai'; //<- object destructuring
import UserRepository from '../src/UserRepository';

describe('User Repository', () => {
  it.skip('should be a function', function () {
    expect(UserRepository).to.be.a('function');
  });

  it.skip('should hold user data', () => {
    const users = [new User({user: "info"}), new User({user: "test"}), new User({user: "another"})];
    const userRepo = new UserRepository(users);
    expect(userRepo.userData).to.deep.equal(users);
  });

  it.skip('should have a method to find user data by id', () => {
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
    const user2Class = new User(user2);
    expect(userRepo.findUser(2).to.deep.equal(user2Class));
  });

  it.skip('should have a method to check the average step goal amongst users', () => {
      const testData = [new User({
              "id": 2,
              "name": "Jarvis Considine",
              "address": "30086 Kathryn Port, Ciceroland NE 07273",
              "email": "Dimitri.Bechtelar11@gmail.com",
              "strideLength": 4.5,
              "dailyStepGoal": 5000,
              "friends": [9, 18, 24, 19]
            }),
            new User({
                    "id": 3,
                    "name": "Jarvis Considine",
                    "address": "30086 Kathryn Port, Ciceroland NE 07273",
                    "email": "Dimitri.Bechtelar11@gmail.com",
                    "strideLength": 4.5,
                    "dailyStepGoal": 7000,
                    "friends": [9, 18, 24, 19]
                  }),
            new User({
                    "id": 4,
                    "name": "Jarvis Considine",
                    "address": "30086 Kathryn Port, Ciceroland NE 07273",
                    "email": "Dimitri.Bechtelar11@gmail.com",
                    "strideLength": 4.5,
                    "dailyStepGoal": 2000,
                    "friends": [9, 18, 24, 19]
                    })];
      const userRepo = new UserRepository(testData);

      expect(userRepo.getAverage().to.equal(4666));
  });
});
