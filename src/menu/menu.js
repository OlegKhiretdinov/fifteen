export default function menu() {
  const main = document.querySelector('main');
  const navEl = document.createElement('nav');
  main.prepend(navEl);
  const closeNav = document.createElement('p');
  closeNav.innerText = 'BACK TO GAME';
  navEl.prepend(closeNav);

  const infoEl = document.createElement('div');
  infoEl.classList.add('info');
  main.prepend(infoEl);
  const infoContentEl = document.createElement('div');
  infoContentEl.classList.add('info__content');
  infoEl.append(infoContentEl);

  const closeInfo = document.createElement('p');
  closeInfo.innerText = 'Go Back';
  infoEl.prepend(closeInfo);

  const menuEl = document.createElement('a');
  menuEl.innerText = 'MENU';
  main.prepend(menuEl);

  menuEl.addEventListener('click', () => navEl.classList.toggle('show-nav'));
  closeNav.addEventListener('click', () => navEl.classList.toggle('show-nav'));
  closeInfo.addEventListener('click', () => infoEl.classList.toggle('show-info'));

  const sound = document.createElement('a');
  sound.innerText = 'Sound';
  sound.classList.add('menu__link');
  navEl.append(sound);

  const newGame = document.createElement('a');
  newGame.innerText = 'NEW GAME';
  newGame.classList.add('menu__link');
  navEl.append(newGame);

  const showTop = document.createElement('a');
  showTop.innerText = 'SHOW TOP';
  showTop.classList.add('menu__link');
  navEl.append(showTop);

  const selectSizeBlock = document.createElement('p');
  selectSizeBlock.innerText = 'SELECT SIZE';
  const selectSize = document.createElement('select');
  selectSize.classList.add('field-size');
  selectSize.innerHTML = `
    <option selected>2</option>
    <option>3</option>
    <option >4</option>
    <option>5</option>
    <option>6</option>
    <option>7</option>
    <option>8</option>
  `;
  selectSizeBlock.append(selectSize);
  navEl.append(selectSizeBlock);

  const saveGame = document.createElement('a');
  saveGame.innerText = 'SAVE GAME';
  saveGame.classList.add('menu__link');
  navEl.append(saveGame);

  const loadGame = document.createElement('a');
  loadGame.innerText = 'LOAD GAME';
  loadGame.classList.add('menu__link');
  navEl.append(loadGame);

  return [
    newGame,
    sound,
    selectSize,
    showTop,
    saveGame,
    loadGame,
    menuEl,
    closeNav,
    infoEl,
    infoContentEl,
    closeInfo,
  ];
}
