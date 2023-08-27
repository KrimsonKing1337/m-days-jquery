import 'reset-css/reset.css';

import './styles.scss';

import './vendors/jquery-1.9.1.min.js';
import './vendors/bluebird.min.js';

import './components/Bg/Bg';
import './components/ProgressBar/ProgressBar';
import './components/Weather/Weather';

function hideAddressBar() {
  window.scroll(0, 1);
}

setTimeout(() => {
  hideAddressBar();
}, 100);

window.addEventListener('orientationchange', hideAddressBar);
