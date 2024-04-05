import 'reset-css/reset.css';

import './styles.scss';

import './vendors/jquery-1.9.1.min.js';
import './vendors/bluebird.min.js';

import './components/Bg/Bg';
// todo: пересекаются css классы и css классы для js.
//  использовать либо БЭМ, либо css модули как-то прикрутить
import './components/ProgressBar/ProgressBar';
import './components/ProgressBarVaporwave/ProgressBarVaporwave';
import './components/Weather/Weather';

import './components/CreateNewPreset/CreateNewPreset';

function hideAddressBar() {
  window.scroll(0, 1);
}

setTimeout(() => {
  hideAddressBar();
}, 100);

window.addEventListener('orientationchange', hideAddressBar);
