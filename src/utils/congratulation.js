function congratulation(time, step) {
  const gameWrap = document.querySelector('.game-wraper');
  const winMessage = document.createElement('div');
  winMessage.classList.add('win-message');
  gameWrap.append(winMessage);
  winMessage.innerHTML = `<p>Ура! Вы решили головоломку за ${time} и ${step} ходов</p>`;
  winMessage.style.display = 'flex';
}

function finishPuzzle() {
  const empty = document.querySelector('.empty');
  empty.style.backgroundPosition = empty.dataset.bgPosition;
  empty.style.backgroundImage = `url(${empty.dataset.bgImg})`;
}

export { congratulation, finishPuzzle };
