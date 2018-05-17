let countdown;

const timer = function(seconds) {
  const now = Date.now();
  const then = now + seconds * 1000;
  countdown = setInterval(function() {
    const secondsLeft = Math.round((then - Date.now()) / 1000); // sec
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    console.log(secondsLeft);
  }, 1000);
};