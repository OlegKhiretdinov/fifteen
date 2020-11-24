/* eslint no-param-reassign: ["error", { "props": false }] */

export default function showTop(infoEl, infoContentEl) {
  infoEl.classList.toggle('show-info');
  infoContentEl.innerHTML = '';

  const resultTable = document.createElement('table');
  resultTable.classList.add('result-table');

  const best = JSON.parse(localStorage.getItem('best'));
  if (best === null) {
    const trEl = document.createElement('tr');
    const td = document.createElement('td');
    td.innerHTML = 'Nobody Could Finish';
    trEl.append(td);
    resultTable.append(trEl);
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

    best.forEach((result, index) => {
      const trEl = document.createElement('tr');
      const tdId = document.createElement('td');
      tdId.innerHTML = index + 1;
      trEl.append(tdId);
      const stepEl = document.createElement('td');
      const timeEl = document.createElement('td');
      const dateEl = document.createElement('td');
      let date;
      [stepEl.innerHTML, , timeEl.innerHTML, date] = result;
      const dateOptions = {
        year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: 'numeric',
      };
      dateEl.innerText = new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(date));
      trEl.append(stepEl);
      trEl.append(timeEl);
      trEl.append(dateEl);
      resultTable.append(trEl);
    });
  }
  infoContentEl.append(resultTable);
}
