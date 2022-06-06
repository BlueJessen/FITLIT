import { expect } from 'chai';
import UserRepository from '../src/UserRepository.js';
import User from '../src/User.js';
import Sleep from '../src/Sleep.js';

describe('Sleep', () => {
  let sleepData;
  beforeEach(() => {
    sleepData = new Sleep([
      {"userID":10,"date":"2019/06/15","hoursSlept":4.4,"sleepQuality":1.6},
      {"userID":10,"date":"2019/06/16","hoursSlept":8,"sleepQuality":4.4},
      {"userID":10,"date":"2019/06/17","hoursSlept":4.3,"sleepQuality":3.6},
      {"userID":10,"date":"2019/06/18","hoursSlept":7,"sleepQuality":3.8},
      {"userID":10,"date":"2019/06/19","hoursSlept":5.3,"sleepQuality":3.1},
      {"userID":10,"date":"2019/06/20","hoursSlept":5.5,"sleepQuality":1.1},
      {"userID":10,"date":"2019/06/21","hoursSlept":4.5,"sleepQuality":2.5},
      {"userID":9,"date":"2019/06/15","hoursSlept":8.9,"sleepQuality":2.2}
    ]);

  });

  it('should be a function', function () {
    expect(Sleep).to.be.a('function');
  });

  it('should be an instance of Sleep', function () {
    expect(sleepData).to.be.an.instanceof(Sleep);
  });

  it('should be be able to extract data by ID', () => {

    expect(sleepData.findUser(10)).to.deep.equal(  {"userID":10,"date":"2019/06/15","hoursSlept":4.4,"sleepQuality":1.6})
  });

  it('should be able to find the average sleep per day', () => {

    expect(sleepData.findAverage(10)).to.equal(5.6);
  });

  it('should be able to find the average sleep quality, per day, over all time for a specific user', () => {

    expect(sleepData.findAverage(10, 'hours')).to.equal(2.9);
  });

  it('should be able to find the most recent date', () => {
    expect(sleepData.findRecentDate(10)).to.deep.equal("2019/06/21")
  });

  it('should find how many hours a user slept for a specific day', () => {

    expect(sleepData.findDateData(10, "2019/06/15", 'hours')).to.equal(4.4);
  });

  it('should find users sleep quality for a specific day', () => {

    expect(sleepData.findDateData(10, "2019/06/16")).to.equal(4.4);
  });

  it('should calculate how many hours slept each day over the course of a given week', () => {

    expect(sleepData.findWeeklyData(10, "2019/06/21", 'hours')).to.deep.equal([4.4, 8, 4.3, 7, 5.3, 5.5, 4.5]);
  });

  it('should find users sleep quality each day over the course of a given week', () => {

    expect(sleepData.findWeeklyData(10, "2019/06/21")).to.deep.equal([1.6, 4.4, 3.6, 3.8, 3.1, 1.1, 2.5]);
  });

  it('should find date of users most recent sleep entries', () => {

    expect(sleepData.findWeeklyDates(10, "2019/06/21")).to.deep.equal(["2019/06/15", "2019/06/16", "2019/06/17", "2019/06/18", "2019/06/19", "2019/06/20", "2019/06/21"]);
  });


  it('should find all users average sleep quality', () => {

    expect(sleepData.findAllAverageSleepQuality()).to.equal(2.8);
  });
});
