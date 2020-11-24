import step from '../assets/sound/step.wav';
import win from '../assets/sound/win.wav';

export default function playSound(sound) {
  const play = new Audio();
  play.volume = 0.1;
  switch (sound) {
    case 'win':
      play.src = win;
      break;
    default:
      play.src = step;
  }
  play.play();
}
