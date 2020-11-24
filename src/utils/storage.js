function saveBest(count, time, humanTime, date) {
  if (!localStorage.getItem('best')) {
    localStorage.setItem('best', '');
    localStorage.best = JSON.stringify([[count, time, humanTime, date]]);
  } else {
    const best = JSON.parse(localStorage.getItem('best'));
    best.push([count, time, humanTime, date]);
    best.sort((a, b) => {
      if (a[0] === b[0]) return a[1] - b[1];
      return a[0] - b[0];
    });
    if (best.length > 10) best.length = 10;
    localStorage.best = JSON.stringify(best);
  }
}

function saveGameState(winString, state, step, time, humanTime, date) {
  if (!localStorage.getItem('saves')) {
    localStorage.setItem('saves', '');
    localStorage.saves = JSON.stringify([[winString, state, step, time, humanTime, date]]);
  } else {
    const saves = JSON.parse(localStorage.getItem('saves'));
    saves.push([winString, state, step, time, humanTime, date]);
    localStorage.saves = JSON.stringify(saves);
  }
}

export { saveBest, saveGameState };
