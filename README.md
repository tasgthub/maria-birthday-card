# A Little Birthday Surprise

A lightweight, responsive six-page birthday card demo for Maria. It runs directly in a browser and needs no install or build step. The third page plays an 8-photo, 32-second film with Nafiz’s own song.

## Open the demo

1. Open `index.html` in a browser (double-click it, or right-click and choose your browser).
2. Use the round arrow buttons, the page dots, or your keyboard arrow keys to move through the card.

The Google Fonts link needs an internet connection; if you're offline, the page uses suitable local fallback fonts.

## Make it yours

- **Names:** In `script.js`, update `PERSONAL.friendName` and `PERSONAL.senderName`.
- **Messages:** Edit the bilingual sample text in `index.html`. Bangla lines are marked with `lang="bn"`.
- **Photos:** The eight supplied photos are in `photos/` and appear in the video in order. Replace `maria-1.jpg` through `maria-8.jpg` to use different pictures.
- **Music:** The card tries to play `birthday-song.mp3` when it opens. If the browser blocks autoplay, tap the music control in the header; the video page also starts the song when Play is pressed. Replace that MP3 to use another track.
- **Colors and layout:** Edit the CSS variables at the top of `style.css`.

For sharing as a public link later, upload the `outputs` folder to a static hosting service. The files are plain HTML, CSS, and JavaScript.
