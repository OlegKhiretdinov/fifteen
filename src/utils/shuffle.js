function startLayout(size) {
  const arr = [];
  for (let i = 0; i < size; i += 1) {
    const row = [];
    for (let j = 1; j <= size; j += 1) {
      if (i === size - 1 && j === size) row.push(0);
      else row.push(size * i + j);
    }
    arr.push(row);
  }
  return arr;
}

function getStep(emptyPosition) {
  const newEmptyPosition = [...emptyPosition];
  const step = Math.ceil(Math.random() * 4);
  switch (step) {
    case 1:
      newEmptyPosition[0] = emptyPosition[0] - 1;
      break;
    case 2:
      newEmptyPosition[1] = emptyPosition[1] + 1;
      break;
    case 3:
      newEmptyPosition[0] = emptyPosition[0] + 1;
      break;
    case 4:
      newEmptyPosition[1] = emptyPosition[1] - 1;
      break;
    default: return newEmptyPosition;
  }
  return [newEmptyPosition, step];
}

function shuffle(size) {
  const gameField = startLayout(size);
  let emptyPosition = [size - 1, size - 1];
  let previousStep = null;

  for (let i = 1; i < (10 * size ** 2); i += 1) {
    const [[row, cell], step] = getStep(emptyPosition);
    const isStepBack = Math.abs(previousStep - step) === 2 && previousStep !== null;
    if ((!gameField[row] || !gameField[row][cell]) || isStepBack) i -= 1;
    else {
      const chipVal = gameField[row][cell];
      gameField[row][cell] = 0;
      gameField[emptyPosition[0]][emptyPosition[1]] = chipVal;
      emptyPosition = [row, cell];
      previousStep = step;
    }
  }

  return gameField;
}

export { shuffle, startLayout };
