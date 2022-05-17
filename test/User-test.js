import { expect } from 'chai';
import User from '../src/User';


describe('User', () => {
  it.skip('should be a function', function () {

    expect(User).to.be.a('function');
  });

  it.skip('should be an instance of User', function () {
    const user = new User();

    expect(user).to.equal(User);
  });

  it.skip('should have a unique id', () => {
        const user = new User({
          "id": 1,
          "name": "Luisa Hane",
          "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
          "email": "Diana.Hayes1@hotmail.com",
          "strideLength": 4.3,
          "dailyStepGoal": 10000,
          "friends": [ 16, 4, 8 ]
      });

    expect(user.id).to.equal(1);
  });

  it.skip('should have a name', () => {
    const user = new User({
      "id": 1,
      "name": "Luisa Hane",
      "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      "email": "Diana.Hayes1@hotmail.com",
      "strideLength": 4.3,
      "dailyStepGoal": 10000,
      "friends": [ 16, 4, 8 ]
  });
  expect(user.name).to.equal("Lisa Hane");
  });

  it.skip('should have an address', () => {
    const user = new User({
      "id": 1,
      "name": "Luisa Hane",
      "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      "email": "Diana.Hayes1@hotmail.com",
      "strideLength": 4.3,
      "dailyStepGoal": 10000,
      "friends": [ 16, 4, 8 ]
  });
  expect(user.address).to.equal("15195 Nakia Tunnel, Erdmanport VA 19901-1697");
});

it.skip('should have an email', () => {
  const user = new User({
    "id": 1,
    "name": "Luisa Hane",
    "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
    "email": "Diana.Hayes1@hotmail.com",
    "strideLength": 4.3,
    "dailyStepGoal": 10000,
    "friends": [ 16, 4, 8 ]
});
expect(user.email).to.equal("Diana.Hayes1@hotmail.com");
});

it.skip('should have a recorded stride length', () => {
  const user = new User({
    "id": 1,
    "name": "Luisa Hane",
    "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
    "email": "Diana.Hayes1@hotmail.com",
    "strideLength": 4.3,
    "dailyStepGoal": 10000,
    "friends": [ 16, 4, 8 ]
});
  expect(user.strideLength).to.equal(4.3);
});

it.skip('should have a daily step goal', () => {
  const user = new User({
    "id": 1,
    "name": "Luisa Hane",
    "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
    "email": "Diana.Hayes1@hotmail.com",
    "strideLength": 4.3,
    "dailyStepGoal": 10000,
    "friends": [ 16, 4, 8 ]
});
expect(user.dailyStepGoal).to.equal(10000);
});

it.skip('should have friends', () => {
  const user = new User({
    "id": 1,
    "name": "Luisa Hane",
    "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
    "email": "Diana.Hayes1@hotmail.com",
    "strideLength": 4.3,
    "dailyStepGoal": 10000,
    "friends": [ 16, 4, 8 ]
});
expect(user.friends).to.equal([ 16, 4, 8 ]);
});

it.skip('should be able to return the first name of each user', () => {
  const user = new User({
    "id": 1,
    "name": "Luisa Hane",
    "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
    "email": "Diana.Hayes1@hotmail.com",
    "strideLength": 4.3,
    "dailyStepGoal": 10000,
    "friends": [ 16, 4, 8 ]
});
expect(user.returnUserName()).to.equal("Luisa");
});
});
