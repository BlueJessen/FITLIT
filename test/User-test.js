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

    expect(user.id).to.not.equal('hello')
  });

  it('should have a name', () => {

  expect(user.name).to.equal("Luisa Hane");
  });

  it('should not accept accept numbers as a name', () => {

    expect(user.name).to.not.equal(333)
  });

  it('should have an address', () => {

  expect(user.address).to.equal("15195 Nakia Tunnel, Erdmanport VA 19901-1697");
});

it('should have an email', () => {

expect(user.email).to.equal("Diana.Hayes1@hotmail.com");
});

it('should have a recorded stride length', () => {

  expect(user.strideLength).to.equal(4.3);
});

it('should have a daily step goal', () => {

expect(user.dailyStepGoal).to.equal(10000);
});

it('should have friends', () => {

expect(user.friends).to.deep.equal([ 16, 4, 8 ]);
});

it('should be able to return the first name of each user', () => {

expect(user.returnUserName()).to.equal("Luisa");
});
});
