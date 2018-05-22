const timerDisplay = document.querySelector('.display__time-left');
const endDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]')
let countdown;

const displayTimeEnd = function(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minute = end.getMinutes();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  endDisplay.textContent = `Be back at ${adjustedHour}:${minute < 10 ? '0' : ''}${minute}`;
};

const displayTimeLeft = function(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = `Timer: ${display}`;
  timerDisplay.textContent = display;
};

const timer = function(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayTimeEnd(then);
  countdown = setInterval(function() {
    const secondsLeft = Math.round((then - Date.now()) / 1000); // sec
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
};

const startTimer = function() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
};

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const minutes = this.minutes.value;
  timer(minutes * 60);
  this.reset();
});