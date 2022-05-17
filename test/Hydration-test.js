import { expect } from 'chai';
import UserRepository from '../src/UserRepository.js';
import User from '../src/User.js';
import Hydration from '../src/Hydration.js';


describe('Hydration', () => {
  it('should be a function', function () {
    expect(Hydration).to.be.a('function');
  });
});
