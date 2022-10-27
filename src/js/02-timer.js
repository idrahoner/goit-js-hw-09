import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  inputDateEl: document.querySelector('#datetime-picker'),
  startButtonEl: document.querySelector('[data-start]'),
  daysCounterEl: document.querySelector('[data-days]'),
  hoursCounterEl: document.querySelector('[data-hours]'),
  minutesCounterEl: document.querySelector('[data-minutes]'),
  secondsCounterEl: document.querySelector('[data-seconds]'),
};

let targetDate = null;

refs.startButtonEl.disabled = 'true';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    targetDate = new Date(selectedDates[0]).getTime();
    if (Date.now() < targetDate) {
      refs.startButtonEl.removeAttribute('disabled');
      refs.startButtonEl.addEventListener('click', buttonClickHandler);
    } else {
      refs.startButtonEl.disabled = 'true';
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr(refs.inputDateEl, options);

function buttonClickHandler() {
  startTimer();
  refs.inputDateEl.disabled = 'true';
  refs.startButtonEl.disabled = 'true';
  refs.startButtonEl.removeEventListener('click', buttonClickHandler);
}

function startTimer() {
  renderCounter(targetDate - Date.now());
  const timerId = setInterval(() => {
    const timeDifference = targetDate - Date.now();
    if (timeDifference < 0) {
      refs.inputDateEl.removeAttribute('disabled');
      return clearInterval(timerId);
    }
    renderCounter(timeDifference);
  }, 1000);
}

function renderCounter(timeDifference) {
  const { days, hours, minutes, seconds } = convertMs(timeDifference);
  refs.daysCounterEl.textContent = addLeadingZero(days);
  refs.hoursCounterEl.textContent = addLeadingZero(hours);
  refs.minutesCounterEl.textContent = addLeadingZero(minutes);
  refs.secondsCounterEl.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}
