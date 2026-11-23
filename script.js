// PERSONALIZE: change the names and greeting messages here.
const PERSONAL = { friendName: "Maria", senderName: "Nafiz" };
const pages = [...document.querySelectorAll('.page')];
const dotsHost = document.getElementById('dots');
let current = 0, toastTimer;
pages.forEach((_, i) => {
  const button = document.createElement('button');
  button.className = 'dot';
  button.setAttribute('aria-label', `Go to page ${i + 1}`);
  button.addEventListener('click', () => showPage(i));
  dotsHost.appendChild(button);
});
const dots = [...dotsHost.children];

function showPage(next) {
  if (next < 0 || next >= pages.length || next === current) return;
  const old = current;
  pages[old].classList.remove('active');
  pages[old].classList.toggle('exit-left', next > old);
  setTimeout(() => pages[old].classList.remove('exit-left'), 420);
  current = next;
  pages[current].classList.add('active');
  dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  document.getElementById('pageNumber').textContent = String(current + 1).padStart(2, '0');
  document.getElementById('progressFill').style.width = `${(current + 1) / pages.length * 100}%`;
  document.getElementById('prev').disabled = current === 0;
  document.getElementById('next').disabled = current === pages.length - 1;
}

document.getElementById('next').addEventListener('click', () => showPage(current + 1));
document.getElementById('prev').addEventListener('click', () => showPage(current - 1));
document.getElementById('restart').addEventListener('click', () => showPage(0));
document.getElementById('friendNameHero').textContent = PERSONAL.friendName;
document.getElementById('friendNameWish').textContent = PERSONAL.friendName;
document.getElementById('friendNameFinal').textContent = PERSONAL.friendName;
document.getElementById('senderNameOne').textContent = PERSONAL.senderName;
document.getElementById('senderNameTwo').textContent = PERSONAL.senderName;
document.getElementById('senderFooter').textContent = PERSONAL.senderName.toUpperCase();

document.getElementById('wishButton').addEventListener('click', event => {
  const rect = event.currentTarget.getBoundingClientRect();
  for (let i = 0; i < 20; i++) {
    const sparkle = document.createElement('i');
    sparkle.className = 'sparkle';
    sparkle.textContent = ['✦', '✧', '♥', '✿'][i % 4];
    sparkle.style.left = `${rect.left + rect.width / 2}px`;
    sparkle.style.top = `${rect.top + rect.height / 2}px`;
    sparkle.style.setProperty('--x', `${(Math.random() - .5) * 240}px`);
    sparkle.style.setProperty('--y', `${(Math.random() - .5) * 180}px`);
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 950);
  }
  showToast('A little birthday magic, just for you ✨');
});

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight') showPage(current + 1);
  if (event.key === 'ArrowLeft') showPage(current - 1);
});
dots[0].classList.add('active');
document.getElementById('prev').disabled = true;

const birthdayAudio = document.getElementById('birthdayAudio');
const musicToggle = document.getElementById('musicToggle');
const musicToggleLabel = document.getElementById('musicToggleLabel');
const musicHint = document.getElementById('musicHint');
let musicEnabled = false;
let userTurnedMusicOff = false;

function updateMusicControls() {
  musicToggle.setAttribute('aria-pressed', String(musicEnabled));
  musicToggle.setAttribute('aria-label', musicEnabled ? 'Turn birthday music off' : 'Turn birthday music on');
  musicToggleLabel.textContent = musicEnabled ? 'Music on' : 'Music off';
  musicHint.textContent = musicEnabled
    ? '♫ Your birthday song is playing'
    : '♫ If the song stays quiet, tap “Music off” to start it';
  musicHint.classList.toggle('playing', musicEnabled);
}

async function startMusic() {
  if (!birthdayAudio || musicEnabled) return;
  try {
    await birthdayAudio.play();
    musicEnabled = true;
    userTurnedMusicOff = false;
    updateMusicControls();
  } catch {
    musicEnabled = false;
    updateMusicControls();
  }
}

function stopMusic(byUser = false) {
  birthdayAudio?.pause();
  musicEnabled = false;
  if (byUser) userTurnedMusicOff = true;
  updateMusicControls();
}

musicToggle.addEventListener('click', () => musicEnabled ? stopMusic(true) : startMusic());
// Browsers may block sound until a visitor interacts; try autoplay first, then start on their first tap.
startMusic();
document.addEventListener('pointerdown', () => {
  if (!musicEnabled && !userTurnedMusicOff) startMusic();
}, { once: true });
document.addEventListener('keydown', () => {
  if (!musicEnabled && !userTurnedMusicOff) startMusic();
}, { once: true });
updateMusicControls();
// A 32-second, eight-photo film, set to the personal birthday song.
const canvas = document.getElementById('birthdayVideo');
const ctx = canvas.getContext('2d');
const photos = Array.from({ length: 8 }, (_, i) => {
  const image = new Image();
  image.src = `photos/maria-${i + 1}.jpg`;
  return image;
});
const captions = [
  'A little sunshine, just like you ♡', 'May your days bloom with joy ✿',
  'Keep being beautifully you ✦', 'Here’s to all the lovely memories ♡',
  'A heart as kind as yours ✨', 'Wishing you every little happiness',
  'May this year bring bright adventures', 'Happy Birthday, Maria! ♡'
];
let filmStart = 0, filmElapsed = 0, filmTimer = null, videoPaused = false;
const playButton = document.getElementById('playVideo');
const pauseButton = document.getElementById('pauseVideo');
const cover = document.getElementById('videoCover');

function drawFilm(seconds) {
  const width = canvas.width, height = canvas.height;
  const index = Math.min(7, Math.floor(seconds / 4));
  const local = (seconds % 4) / 4;
  const image = photos[index];
  ctx.clearRect(0, 0, width, height);
  if (image.complete && image.naturalWidth) {
    const scale = Math.max(width / image.width, height / image.height) * 1.08;
    const imageWidth = image.width * scale, imageHeight = image.height * scale;
    const pan = (local - .5) * 24;
    ctx.drawImage(image, (width - imageWidth) / 2 - pan, (height - imageHeight) / 2, imageWidth, imageHeight);
  } else {
    ctx.fillStyle = '#c9b2cf';
    ctx.fillRect(0, 0, width, height);
  }
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#301c3040');
  gradient.addColorStop(.45, '#301c3000');
  gradient.addColorStop(1, '#301c30b8');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff9';
  ctx.font = '600 19px sans-serif';
  ctx.fillText('A LITTLE BIRTHDAY FILM', width / 2, 48);
  ctx.fillStyle = '#fff';
  ctx.shadowColor = '#26162a';
  ctx.shadowBlur = 12;
  ctx.font = '600 32px Georgia,serif';
  ctx.fillText(captions[index], width / 2, height - 58);
  ctx.shadowBlur = 0;
  document.getElementById('videoCaption').textContent = captions[index].toUpperCase();
  document.getElementById('videoTime').textContent = `00:${String(Math.min(32, Math.floor(seconds))).padStart(2, '0')} / 00:32`;
}

function startFilm() {
  clearInterval(filmTimer);
  if (!musicEnabled && !userTurnedMusicOff) startMusic();
  videoPaused = false;
  cover.classList.add('hidden');
  playButton.innerHTML = '<span>↺</span> Replay birthday video';
  pauseButton.textContent = 'Ⅱ';
  filmStart = performance.now() - filmElapsed * 1000;
  filmTimer = setInterval(() => {
    filmElapsed = (performance.now() - filmStart) / 1000;
    drawFilm(filmElapsed);
    if (filmElapsed >= 32) {
      filmElapsed = 32;
      drawFilm(32);
      clearInterval(filmTimer);
      videoPaused = true;
      pauseButton.textContent = '▶';
      showToast('Happy Birthday, Maria! ♡');
    }
  }, 70);
}

playButton.addEventListener('click', () => {
  if (filmElapsed >= 32) filmElapsed = 0;
  startFilm();
});
pauseButton.addEventListener('click', () => {
  if (!videoPaused && filmTimer) {
    clearInterval(filmTimer);
    videoPaused = true;
    pauseButton.textContent = '▶';
  } else if (videoPaused && filmElapsed < 32) {
    startFilm();
  }
});
drawFilm(0);

