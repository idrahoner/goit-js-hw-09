import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', event => {
  event.preventDefault();
  const INITIAL_DELAY = Number(formEl.delay.value);
  const STEP_DELAY = Number(formEl.step.value);
  const AMOUNT = Number(formEl.amount.value);

  callPromises(INITIAL_DELAY, STEP_DELAY, AMOUNT);
});

function callPromises(delay, step, amount) {
  if (amount <= 0) {
    return;
  }
  let currentDelay = delay;
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    currentDelay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
