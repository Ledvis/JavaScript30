const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const getVideo = function() {
  navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    })
    .then(LocalMediaStream => {
      video.src = URL.createObjectURL(LocalMediaStream);
      video.play();
    })
    .catch(err => {
      console.error('You should probably allow your webcam to record', err);
    });
};

const redEffect = function(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] += 100; // RED
    pixels.data[i + 1] -= 50; // GREEN
    pixels.data[i + 2] *= 0, 5; // BLUE
  };

  return pixels;
};

const rgbSplit = function(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 100] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 150] = pixels.data[i + 2]; // BLUE
  };

  return pixels;
};

const greenScreen = function(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (let i = 0; i < pixels.data.length; i = i + 4) {
    let red = pixels.data[i + 0];
    let green = pixels.data[i + 1];
    let blue = pixels.data[i + 2];
    let alpha = pixels.data[i + 3];

    if (red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

const paintOnCanvas = function() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    // take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);
    // mess with the pixels
    // redEffect(pixels);
    // rgbSplit(pixels);
    greenScreen(pixels);
    // ctx.globalAlpha = 0.1;
    // put the pixels back
    ctx.putImageData(pixels, 0, 0);
  }, 16);
};

const takePhoto = function() {
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="Handsome Man">`;
  strip.insertBefore(link, strip.firstChild);
};

getVideo();

video.addEventListener('canplay', paintOnCanvas);