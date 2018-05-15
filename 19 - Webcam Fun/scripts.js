import { createGzip } from "zlib";

const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const getVideo = function() {
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(LocalMediaStream => {
      video.src = URL.createObjectURL(LocalMediaStream);
      video.play();
    })
    .catch(err => {
      console.error('You should probably allow your webcam to record', err);
    });
};

const redEffect = function(pixels) {
  for (let i = 0; i < pixels.data.lenght; i += 4) {
    pixels.data[i + 0] += 100; // RED
    pixels.data[i + 1] -= 50; // GREEN
    pixels.data[i + 2] *= 0,5; // BLUE
  };

  return pixels;
};

const paintOnCanvas = function() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);
    redEffect(pixels);
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