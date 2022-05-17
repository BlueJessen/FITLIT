import { expect } from 'chai'; //<- object destructuring
import UserRepository from '../src/UserRepository.js';
import User from '../src/User.js'

describe('User Repository', () => {
  let user = null;
  let user2 = null;
  let users = null;
  let userRepo = null;
    beforeEach(() => {user = new User({
        "id": 2,
        "name": "Jarvis Considine",
        "address": "30086 Kathryn Port, Ciceroland NE 07273",
        "email": "Dimitri.Bechtelar11@gmail.com",
        "strideLength": 4.5,
        "dailyStepGoal": 5000,
        "friends": [9, 18, 24, 19]
      });

      user2 = new User({
        "id": 1,
        "name": "Luisa Hane",
        "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
        "email": "Diana.Hayes1@hotmail.com",
        "strideLength": 4.3,
        "dailyStepGoal": 10000,
        "friends": [ 16, 4, 8 ]
        });
        users = [user, user2];
        userRepo = new UserRepository(users);
  });

  it('should be a function', function () {
    expect(UserRepository).to.be.a('function');
  });

  it('should hold user data', () => {
    expect(userRepo.userData).to.deep.equal(users);
  });

  it('should have a method to find user data by id', () => {
    expect(userRepo.findUser(2)).to.deep.equal(user);
  });

  it('should have a method to check the average step goal amongst users', () => {
      expect(userRepo.getAverage()).to.equal(7500);
  });
});
