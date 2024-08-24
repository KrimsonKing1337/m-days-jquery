import 'url-search-params-polyfill';

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

$(() => {
  // mr = meta refresh
  const mr = new URLSearchParams(window.location.search).get('mr'); // seconds
  const mrAsNumber = Number(mr);

  if (mrAsNumber) {
    setInterval(() => {
      window.location.reload();
    }, mrAsNumber * 1000);
  }
});
