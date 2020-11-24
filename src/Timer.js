export default class Timer {
  constructor(time = 0) {
    this.time = time;
    this.timeEl = document.querySelector('.time');
    this.timeEl.innerHTML = 'Get Started';
    this.stop = false;
  }

  runTimer() {
    if (this.stop) {
      this.stop = false;
    } else {
      this.time += 1;
      const humanTime = this.getHumanTime;
      this.timeEl.innerHTML = humanTime;
      setTimeout(() => this.runTimer(), 1000, this.time);
    }
  }

  stopTimer() {
    this.stop = true;
  }

  get getTime() {
    return this.time;
  }

  get getHumanTime() {
    const secNum = this.time % 60;
    const secStr = secNum >= 10 ? String(secNum) : `0${String(secNum)}`;
    const min = String(Math.floor(this.time / 60));
    return `${min}:${secStr}`;
  }
}
