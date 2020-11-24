/* eslint-disable no-use-before-define */
// eslint-disable-next-line consistent-return
export default function move(event) {
  if (event.which !== 1) return;
  if (!this.stepEnd) return;
  this.stepEnd = false;
  let isMove = true;
  let firstMouseDowwn = true;
  const chipEl = event.target.closest('.chip');
  if (!chipEl) return;
  const chipTd = chipEl.closest('td');
  const chipElX = chipTd.cellIndex;
  const chipElY = chipEl.closest('tr').rowIndex;

  const emptyEl = event.target.closest('.game-field').querySelector('.empty');
  const emptyTd = emptyEl.closest('td');
  const emptyX = emptyTd.cellIndex;
  const emptyY = emptyEl.closest('tr').rowIndex;

  const diffX = chipElX - emptyX;
  const diffY = chipElY - emptyY;

  if ((Math.abs(diffX) > 1 || Math.abs(diffY) > 1)
  || (Math.abs(diffX) === Math.abs(diffY))) {
    this.stepEnd = true;
    return;
  }

  let moveDirection;
  if (diffY === 0) moveDirection = 'right';
  if (diffX === 0) moveDirection = 'bottom';
  chipEl.style.right = 0;
  chipEl.style.bottom = 0;

  const positionChip = chipEl.getBoundingClientRect()[moveDirection];
  const positionEmpty = emptyEl.getBoundingClientRect()[moveDirection];
  const diffPostion = positionChip - positionEmpty;

  const chipCoordinateX = event.pageX;
  const chipCoordinateY = event.pageY;

  function moveChip(e) {
    chipEl.style.zIndex = '999';
    chipEl.style.transition = 'none';
    chipEl.style.right = `${chipCoordinateX - e.pageX}px`;
    chipEl.style.bottom = `${chipCoordinateY - e.pageY}px`;
  }

  document.addEventListener('mousemove', moveChip);

  const changeChipPosiiton = () => {
    chipEl.style.zIndex = '';
    if (!firstMouseDowwn) return;
    firstMouseDowwn = false;
    document.removeEventListener('mousemove', moveChip);
    chipEl.style.transition = '';
    const {
      x: baseX, y: baseY, width, height,
    } = emptyEl.getBoundingClientRect();
    const { x: movementX, y: movementY } = chipEl.getBoundingClientRect();

    if (Math.abs(baseX - movementX) < width * 0.8 && Math.abs(baseY - movementY) < height * 0.8) {
      chipEl.style[moveDirection] = `${diffPostion}px`;
      isMove = true;
      this.changeState([[chipElX, chipElY], [emptyX, emptyY]]);
      this.stepComplited();
    } else if (baseX - movementX === 0 || baseY - movementY === 0) {
      chipEl.style[moveDirection] = `${diffPostion}px`;
      isMove = true;
      this.changeState([[chipElX, chipElY], [emptyX, emptyY]]);
      this.stepComplited();
    } else {
      chipEl.style.bottom = 0;
      chipEl.style.right = 0;
      isMove = false;
    }
    setTimeout(transitionnn.bind(this), 400);
  };

  function transitionnn() {
    document.removeEventListener('mouseup', changeChipPosiiton);
    if (isMove) {
      chipTd.append(emptyEl);
      emptyTd.append(chipEl);
    }
    chipEl.style.right = '';
    chipEl.style.bottom = '';
    this.stepEnd = true;
    firstMouseDowwn = true;
  }

  document.addEventListener('mouseup', changeChipPosiiton);
}
