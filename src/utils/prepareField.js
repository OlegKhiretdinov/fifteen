import image from '../assets/img/98.jpg';

export default function prepareField(state) {
  const gameField = document.createElement('table');
  gameField.classList.add('game-field');
  state.forEach((row) => {
    const tr = document.createElement('tr');
    row.forEach((chip) => {
      const td = document.createElement('td');
      const chipEl = document.createElement('div');
      const rowLength = state.length;
      const x = (chip - 1) % rowLength;
      const y = Math.floor((chip - 1) / rowLength);
      chipEl.style.backgroundSize = `${100 * rowLength}%`;
      if (chip !== 0) {
        chipEl.style.backgroundImage = `url(${image})`;
        chipEl.style.backgroundPosition = `-${100 * x}% -${100 * y}%`;
        chipEl.innerHTML = chip;
        chipEl.classList.add('chip');
      } else {
        chipEl.classList.add('empty');
        chipEl.dataset.bgPosition = `-${100 * (rowLength - 1)}% -${100 * (rowLength - 1)}%`;
        chipEl.dataset.bgImg = image;
      }
      td.append(chipEl);
      tr.append(td);
    });
    gameField.append(tr);
  });
  return gameField;
}
