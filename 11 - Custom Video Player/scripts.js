/* Get Our Elements */
const playerEl = document.querySelector('.player');
const videoEl = playerEl.querySelector('.viewer');
const progressEl = playerEl.querySelector('.progress');
const progressBarEl = playerEl.querySelector('.progress__filled');
const toggleEl = playerEl.querySelector('.toggle');
const skipButtonsEl = playerEl.querySelectorAll('[data-skip]');
const rangesEl = playerEl.querySelectorAll('.player__slider');

const togglePlay = function() {
  if (videoEl.paused) {
    videoEl.play();
  } else {
    videoEl.pause();
  }
};

const updateButton = function() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggleEl.textContent = icon;
};

videoEl.addEventListener('click', togglePlay);
videoEl.addEventListener('play', updateButton);
videoEl.addEventListener('pause', updateButton);
toggleEl.addEventListener('click', togglePlay);