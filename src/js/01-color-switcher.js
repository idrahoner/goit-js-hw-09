const startButtonEl = document.querySelector('[data-start]');
const stopButtonEl = document.querySelector('[data-stop]');

let timerId = null;

startButtonEl.addEventListener('click', onStartButtonClick);
stopButtonEl.addEventListener('click', onStopButtonClick);

stopButtonEl.disabled = 'true';

function onStartButtonClick(event) {
  stopButtonEl.removeAttribute('disabled');
  event.currentTarget.disabled = 'true';

  timerId = setInterval(switchBgColor, 1000);
}

function onStopButtonClick(event) {
  startButtonEl.removeAttribute('disabled');
  event.currentTarget.disabled = 'true';
  clearInterval(timerId);
}

function switchBgColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
