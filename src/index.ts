import 'reset-css/reset.css';
import '../public/fonts/avenir-lt-std/style.css';
import './styles.scss';

import './vendors/jquery-1.9.1.min.js';

import './components/Bg/Bg';
import './components/ProgressBar/ProgressBar';

function hideAddressBar() {
  window.scroll(0, 1);
}

type bodyWithLegacyFullScreen = HTMLElement & {
  webkitRequestFullscreen: () => void;
  mozRequestFullScreen: () => void;
  msRequestFullscreen: () => void;
};

function requestFullScreen() {
  const el = document.body as bodyWithLegacyFullScreen;

  // Supports most browsers and their versions.
  const requestMethod = el.requestFullscreen
    || el.webkitRequestFullscreen
    || el.mozRequestFullScreen
    || el.msRequestFullscreen;

  if (requestMethod) {
    // Native full screen.
    requestMethod.call(el);
  }
}

setTimeout(() => {
  hideAddressBar();
}, 100);

window.addEventListener('orientationchange', hideAddressBar);

document.addEventListener('click', requestFullScreen);
