/* Get Our Elements */
const playerEl = document.querySelector('.player');
const videoEl = playerEl.querySelector('.viewer');
const progressEl = playerEl.querySelector('.progress');
const progressBarEl = playerEl.querySelector('.progress__filled');
const toggleEl = playerEl.querySelector('.toggle');
const skipButtonEls = playerEl.querySelectorAll('[data-skip]');
const rangeEls = playerEl.querySelectorAll('.player__slider');

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

const onSkipButtonElClick = function() {
  videoEl.currentTime += parseFloat(this.dataset.skip);
};

let isClicked = false;

const handleRangeUpdate = function() {
  if (isClicked) {
    videoEl[this.name] = this.value;
  }
};

const handleProgress = function() {
  const percent = (videoEl.currentTime / videoEl.duration) * 100;
  progressBarEl.style.flexBasis = `${percent}%`;
};

const scrubTime = function(evt) {
  const time = (evt.offsetX / progressEl.offsetWidth) * videoEl.duration;
  videoEl.currentTime = time;
};

let mousedown = false;

skipButtonEls.forEach(button => button.addEventListener('click', onSkipButtonElClick));
rangeEls.forEach(range => range.addEventListener('change', handleRangeUpdate));
rangeEls.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
rangeEls.forEach(range => range.addEventListener('mousedown', () => isClicked = true));
rangeEls.forEach(range => range.addEventListener('mouseup', () => isClicked = false));
rangeEls.forEach(range => range.addEventListener('mouseout', () => isClicked = false));
videoEl.addEventListener('timeupdate', handleProgress);
progressEl.addEventListener('click', scrubTime);
progressEl.addEventListener('mousemove', (evt) => mousedown && scrubTime(evt));
progressEl.addEventListener('mousedown', () => mousedown = true);
progressEl.addEventListener('mouseup', () => mousedown = false);
