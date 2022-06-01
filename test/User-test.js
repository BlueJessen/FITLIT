import { expect } from 'chai';
import User from '../src/User';


describe('User' , () => {
  let user = null;
    beforeEach(() => {user = new User({
      "id": 1,
      "name": "Luisa Hane",
      "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      "email": "Diana.Hayes1@hotmail.com",
      "strideLength": 4.3,
      "dailyStepGoal": 10000,
      "friends": [ 16, 4, 8 ]
    });
  });

  it('should be a function', function () {

    expect(User).to.be.a('function');
  });

  it('should be an instance of User', function () {

    expect(user).to.be.an.instanceof(User);
  });

  it('should have a unique id', () => {

    expect(user.id).to.equal(1);
  });

  it('should not have a number as an id', () => {

    expect(user.id).to.not.be.an('string');
  });

  it('should have a name', () => {

  expect(user.name).to.equal("Luisa Hane");
  });

  it('should be a string', () => {

    expect(user.name).to.be.a('string');
  });

  it('should not have a number as a name', () => {

    expect(user.name).to.be(NAN);
  });

  it('should have an address', () => {

  expect(user.address).to.equal("15195 Nakia Tunnel, Erdmanport VA 19901-1697");
});

it('should always be a string', () => {

  expect(user.address).to.be.a('string');
});

it('should have an email', () => {

expect(user.email).to.equal("Diana.Hayes1@hotmail.com");
});

it('should be a valid email', () => {

  expect(user.email).to.include('@');
});

it('should always be a string', () => {

  expect(user.email).to.be.a('string');
});

it('should have a recorded stride length', () => {

  expect(user.strideLength).to.equal(4.3);
});

it('should have a default stride length', () => {

  expect(user.strideLength).to.equal(0);
});

it('should have a daily step goal', () => {

expect(user.dailyStepGoal).to.equal(10000);
});

it('should have a default daily step goal', () => {

  expect(user.dailystepGoal).to.equal(0);
});

it('should have friends', () => {

expect(user.friends).to.deep.equal([ 16, 4, 8 ]);
});

it('should have a default friendslist', () => {

  expect(user.friends).to.equal([]);
});

it('should be able to return the first name of each user', () => {

expect(user.returnUserName()).to.equal("Luisa");
});
it('should always return a string, when returning the first name', () => {

  expect(user.returnUserName()).to.be.a('string');
});
});
