/* eslint no-param-reassign: ["error", { "props": false }] */

export default function showSave(infoEl, infoContentEl, savedGames) {
  infoEl.classList.toggle('show-info');
  infoContentEl.innerHTML = '';

  const resultTable = document.createElement('table');
  resultTable.classList.add('save-table');

  if (savedGames === null) {
    const trEl = document.createElement('tr');
    const td = document.createElement('td');
    td.innerHTML = 'Not Saved Yet';
    trEl.append(td);
    resultTable.append(trEl);
    resultTable.dataset.isEmpty = 'true';
  } else {
    const theadEl = document.createElement('thead');
    const tableHead = document.createElement('tr');
    tableHead.classList.add('table-head');

    const tdPos = document.createElement('td');
    tdPos.innerText = '#';
    tableHead.append(tdPos);
    const tdStep = document.createElement('td');
    tdStep.innerText = 'STEP';
    tableHead.append(tdStep);
    const tdTime = document.createElement('td');
    tdTime.innerText = 'TIME';
    tableHead.append(tdTime);
    const tdDate = document.createElement('td');
    tdDate.innerText = 'DATE';
    tableHead.append(tdDate);

    theadEl.append(tableHead);
    resultTable.append(theadEl);

    savedGames.forEach((game, index) => {
      const trEl = document.createElement('tr');
      trEl.dataset.id = index;

      const tdId = document.createElement('td');
      const stepEl = document.createElement('td');
      const timeEl = document.createElement('td');
      const dateEl = document.createElement('td');
      const step = game[2];
      const time = game[4];
      const date = game[5];
      tdId.innerHTML = index + 1;
      stepEl.innerHTML = step;
      timeEl.innerHTML = time;
      const dateOptions = {
        year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: 'numeric',
      };
      dateEl.innerText = new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(date));
      trEl.append(tdId);
      trEl.append(stepEl);
      trEl.append(timeEl);
      trEl.append(dateEl);
      resultTable.append(trEl);
    });
  }

  infoContentEl.append(resultTable);

  return resultTable;
}
