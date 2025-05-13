import Bluebird from 'bluebird';

import 'url-search-params-polyfill';

import './vendors';
import './styles';
import './components';

(window as any).Promise = Bluebird;
(global as any).Promise = Bluebird;

function hideAddressBar() {
  window.scroll(0, 1);
}

window.addEventListener('orientationchange', hideAddressBar);

$(() => {
  setTimeout(() => {
    hideAddressBar();
  }, 100);

  // mr = meta refresh
  const mr = new URLSearchParams(window.location.search).get('mr'); // seconds
  const mrAsNumber = Number(mr);

  if (mrAsNumber) {
    setInterval(() => {
      window.location.reload();
    }, mrAsNumber * 1000);
  }
});
