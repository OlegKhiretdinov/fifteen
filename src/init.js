import Game from './Game';
import menu from './menu/menu';
import { shuffle, startLayout } from './utils/shuffle';
import { saveGameState } from './utils/storage';
import showTop from './menu/showTop';
import showSave from './menu/showSave';

export default function init() {
  document.body.innerHTML = `
    <h1>Gem Puzzle</h1>
    <main>
      <div class="counters">
        <div class="timer">
          <span class="time"></span>
        </div>
        <div class="step-counter">
          <span>Step count</span>
          :
          <span class="count"></span>
        </div>
      </div>
      <div class="game-wraper"></div>
    </main>
  `;
  let size = 4;
  let winString = startLayout(size).join();
  let shuffleField = shuffle(size);

  const gameWrap = document.querySelector('.game-wraper');
  let game = new Game(winString, shuffleField);
  gameWrap.append(game.gameField);

  // MENU
  const [
    newGame,
    sound,
    selectSize,
    showTopLink,
    saveGame,
    loadGame,
    menuEl,
    closeNav,
    infoEl,
    infoContentEl,
    closeInfo,
  ] = menu();

  menuEl.click();
  menuEl.addEventListener('click', () => game.timer.stopTimer());

  closeNav.addEventListener('click', () => game.timer.runTimer());

  const linkSoundContent = () => {
    sound.innerHTML = game.playSound ? 'TURN OFF SOUND' : 'TURN ON SOUND';
  };
  linkSoundContent();

  sound.addEventListener('click', () => {
    game.playSound = !game.playSound;
    linkSoundContent();
  });

  newGame.addEventListener('click', (e) => {
    e.preventDefault();
    gameWrap.innerHTML = '';
    winString = startLayout(size).join();
    shuffleField = shuffle(size);
    game = new Game(winString, shuffleField, 0, 0, game.playSound);
    gameWrap.append(game.gameField);
    closeNav.click();
    linkSoundContent();
  });

  selectSize.addEventListener('change', (e) => {
    size = Number(e.target.value);
    gameWrap.innerHTML = '';
    game.timer.stopTimer();
    winString = startLayout(size).join();
    shuffleField = shuffle(size);
    game = new Game(winString, shuffleField, 0, 0, game.playSound);
    gameWrap.append(game.gameField);
    closeNav.click();
    linkSoundContent();
  });

  showTopLink.addEventListener('click', () => {
    showTop(infoEl, infoContentEl);
  });

  saveGame.addEventListener('click', () => {
    const { state, step, timer: { getTime, getHumanTime } } = game;
    saveGameState(winString, state, step, getTime, getHumanTime, new Date());
  });

  loadGame.addEventListener('click', () => {
    const savedGames = JSON.parse(localStorage.getItem('saves'));
    const table = showSave(infoEl, infoContentEl, savedGames);
    if (table.dataset.isEmpty === 'true') return;

    table.querySelectorAll('tr').forEach((save, index) => {
      if (index === 0) return;
      save.addEventListener('click', () => {
        const loadedState = savedGames[save.dataset.id];
        gameWrap.innerHTML = '';
        [winString, shuffleField] = loadedState;
        game = new Game(winString, shuffleField, loadedState[3], loadedState[2], game.playSound);
        gameWrap.append(game.gameField);
        closeInfo.click();
        closeNav.click();
        linkSoundContent();
      });
    });
  });
}

init();
