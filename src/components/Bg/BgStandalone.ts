import imgBgStandaloneJson from 'standalone/img_bg.json';

import { Themes } from '@types';

import { getRandomImageStandalone } from './utils/getRandomImageStandalone';

import { setSkin } from '../Weather/Weather';

import './Bg.scss';

console.log('___ BgStandalone was loaded successfully');

$(async () => {
  const rootElement = document.querySelector('#root');

  if (!rootElement) {
    return;
  }

  const $bg = $('.js-bg');
  const $bgNext = $('.js-bg-next');
  const $animWrapper = $('.js-anim-wrapper');
  const $progressBarsWrapper = $('.js-progress-bars-wrapper');
  const $progressBarsDull = $('.js-progress-bars-dull');

  //# region костыль
  const $progressBar = $('.js-progress-bar');
  const $progressBarCyberpunk = $('.js-progress-bar-vaporwave');

  const theme = new URLSearchParams(window.location.search).get('theme');

  if (theme) {
    if (theme === Themes.cyberpunk) {
      $progressBar.remove();
      setSkin('cyberpunk');
    }

    if (theme === Themes.default) {
      $progressBarCyberpunk.remove();
    }
  } else {
    $progressBarCyberpunk.remove();
  }
  //# endregion костыль

  let bgNext = getRandomImageStandalone(imgBgStandaloneJson);

  const changeOpacity = (value: string) => {
    $animWrapper.css('opacity', value);
  }

  const changeImage = () => {
    $bg.css('background-image', `url(/${bgNext})`);

    bgNext = getRandomImageStandalone(imgBgStandaloneJson);

    $bgNext.css('background-image', `url(/${bgNext})`);
  }

  changeImage();

  setInterval(() => {
    changeOpacity('0');

    setTimeout(() => {
      changeImage();
    }, 300); // transition duration

    setTimeout(() => {
      changeOpacity('1');
    }, 700);
  }, 12000);

  $progressBarsDull.hide();
  $progressBarsWrapper.show();
});
