import { expect } from 'chai';
import UserRepository from '../src/UserRepository.js';
import User from '../src/User.js';
import Sleep from '../src/Sleep.js';

describe('Sleep', () => {
  let sleepData;
  before(() => {
    sleepData = new Sleep(
      {"userID":10,"date":"2019/06/15","hoursSlept":4.4,"sleepQuality":1.6},
      {"userID":10,"date":"2019/06/16","hoursSlept":8,"sleepQuality":4.4},
      {"userID":10,"date":"2019/06/17","hoursSlept":4.3,"sleepQuality":3.6},
      {"userID":10,"date":"2019/06/18","hoursSlept":7,"sleepQuality":3.8},
      {"userID":10,"date":"2019/06/19","hoursSlept":5.3,"sleepQuality":3.1},
      {"userID":10,"date":"2019/06/20","hoursSlept":5.5,"sleepQuality":1.1},
      {"userID":10,"date":"2019/06/21","hoursSlept":4.5,"sleepQuality":2.5},
      {"userID":9,"date":"2019/06/15","hoursSlept":8.9,"sleepQuality":2.2}
    );

  });

  it.skip('should be a function', function () {
    expect(Sleep).to.be.a('function');
  });

  it.skip('should be an instance', function () {

    expect(sleepData).to.be.equal(Sleep);
  });

  it.skip('should be be able to extract data by ID', () => {

    expect(sleepData.findUser(10)).to.deep.equal(  {"userID":10,"date":"2019/06/15","hoursSlept":4.4,"sleepQuality":1.6})
  });

  it.skip('should be able to find the average sleep per day', () => {

    expect(sleepData.findAverageSleepHours(10, "2019/06/15", 4.4)).to.equal(5.5);
  });

  it.skip('should be able to find the average sleep quality, per day, over all time for a specific user', () => {

    expect(sleepData.findAverageSleepQuality(10, "2019/06/15", 1.6)).to.equal(2.8);
  });

  it.skip('should find how many hours a user slept for a specific day', () => {

    expect(sleepData.findDaySleepHours(10, "2019/06/15")).to.equal(4.4);
  });

  it.skip('should find users sleep quality for a specific day', () => {

    expect(sleepData.findDaySleepQuality(10, "2019/06/15")).to.equal(1.6);
  });

  it.skip('should calculate how many hours slept each day over the course of a given week', () => {

    expect(sleepData.findWeeklySleepHours(10, "2019/06/15")).to.equal(4.4, 8, 4.3, 7, 5.3, 5.5, 4.5);
  });

  it.skip('should find users sleep quality each day over the course of a given week', () => {

    expect(sleepData.findWeeklySleepQuality(10, "2019/06/15")).to.equal(1.6, 4.4, 3.6, 3.8, 3.1, 1.1, 2.5);
  });

  it.skip('should find all users average sleep quality', () => {

    expect(sleepData.findAllAverageSleepQuality().to.equal(1.9));
  });
});
