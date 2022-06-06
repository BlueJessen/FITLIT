import CircleProgress from 'js-circle-progress';
import Hydration from './Hydration';
import Sleep from './Sleep';
import Activity from './Activity';

class Widget {
constructor(user, repo, type, widget) {
this.user = user;
this.repo = repo;
this.type = type;
this.widget = widget;
this.dataSet = {};
}

findWidgetType() {
  if(this.type === 'sleep') {
    this.setWidgetSleep();
  }else if(this.type === 'activity') {
    this.setWidgetActivity();
  }else if(this.type === 'hydration') {
    this.setWidgetHydration();
  }
}

setWidgetSleep() {
  let recentDate = this.repo.findRecentDate(this.user.id);
  let displayInfo = this.repo.findDateData(this.user.id, recentDate, this.type)
  if(this.type === 'hours') {
    this.addHourDisplay();
  } else {
    this.addQualityDisplay();
  }
}

addHourDisplay() {
  this.widget.max = 8;
  this.widget.value = displayInfo;
}

addQualityDisplay() {
  this.widget.max = 10;
  this.widget.value = displayInfo;
}

setWidgetActivity() {
  if(this.type === 'steps') {
    this.addStepDisplay();
  }else if(this.type  === 'minutes') {
    this.addMinuteDisplay();
  }else if(this.type  === 'stairs') {
    this.addStairDisplay();
  }
}
addStepDisplay() {
  let recentDate = this.repo.findRecentDate(this.user.id);
  let displayInfo = this.repo.findStepsForDate(this.user.id, recentDate);
  this.widget.constrain = false;
  this.widget.max = this.user.dailyStepGoal;
  this.widget.value = displayInfo;
  this.widget.textFormat = 'vertical';
}

addMinuteDisplay() {
  let recentDate = this.repo.findRecentDate(this.user.id);
  this.widget.max = 30;
  this.widget.value = this.repo.minutesActive(this.user.id, recentDate);
  this.widget.constrain = false;
}

addStairDisplay() {
  let recentDate = this.repo.findRecentDate(this.user.id);
  this.widget.max = 100;
  this.widget.value = this.repo.stairsOnDate(this.user.id, recentDate);
  this.widget.constrain = false;
}

setWidgetHydration() {
  let recentDate = this.repo.findRecentDate(this.user.id);
  let displayInfo = this.repo.findDateData(this.user.id, recentDate);
  this.widget.max = 85;
  this.widget.value = displayInfo;
}

}

export default Widget;
