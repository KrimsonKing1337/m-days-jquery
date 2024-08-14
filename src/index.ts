import './vendors';
import './styles';
import './components';

function hideAddressBar() {
  window.scroll(0, 1);
}

setTimeout(() => {
  hideAddressBar();
}, 100);

window.addEventListener('orientationchange', hideAddressBar);
