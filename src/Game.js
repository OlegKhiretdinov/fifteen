import { congratulation, finishPuzzle } from './utils/congratulation';
import move from './move';
import prepareField from './utils/prepareField';
import { saveBest } from './utils/storage';
import sound from './utils/sound';
import Timer from './Timer';

export default class Game {
  constructor(winString, shuffleField, time = 0, step = 0, playSound = false) {
    this.winString = winString;
    this.state = shuffleField;
    this.gameField = prepareField(this.state);
    this.gameField.addEventListener('mousedown', move.bind(this));
    this.timer = new Timer(time);
    this.step = step;
    this.stepEnd = true;
    this.stepCountEl = document.querySelector('.count');
    this.stepCountEl.innerHTML = step;
    this.playSound = playSound;
  }

  changeState(coordinates) {
    const [[chipElX, chipElY], [emptyX, emptyY]] = coordinates;
    const activeChipVal = this.state[chipElY][chipElX];
    this.state[emptyY][emptyX] = activeChipVal;
    this.state[chipElY][chipElX] = 0;
  }

  stepComplited() {
    this.step += 1;
    if (this.winString === this.state.join()) {
      this.stepCountEl.innerHTML = this.step;
      this.timer.stopTimer();
      finishPuzzle();
      if (this.playSound) sound('win');
      congratulation(this.timer.getHumanTime, this.step);
      saveBest(this.step, this.timer.getTime, this.timer.getHumanTime, new Date());
    } else if (this.playSound) sound();
    this.stepCountEl.innerHTML = this.step;
  }
}
