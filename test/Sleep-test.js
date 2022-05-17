import { expect } from 'chai';
import UserRepository from '../src/UserRepository.js';
import User from '../src/User.js';
import Sleep from '../src/Sleep.js';

describe('Sleep', () => {
  it('should be a function', function () {
    expect(Sleep).to.be.a('function');
  });
});
