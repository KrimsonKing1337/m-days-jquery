import 'url-search-params-polyfill';

import './Bg.scss';

import type { ImageJson } from 'm-days-core/@types.js';
import { getRandomImageInfo } from 'm-days-core/utils/getRandomImageInfo/getRandomImageInfo';

import { getInfoAboutPreset } from 'api';
import { setSkin } from '../Weather/Weather';

import imgBgJson from 'img_bg.json';

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

  const $progressBar = $('.js-progress-bar');
  const $progressBarCyberpunk = $('.js-progress-bar-vaporwave');

  const searchParams = new URLSearchParams(window.location.search);
  const preset = searchParams.get('preset') || 'default';

  const presetInfo = await getInfoAboutPreset(preset);

  let bgNext = getRandomImageInfo(presetInfo, imgBgJson) as ImageJson;

  const changeOpacity = (value: string) => {
    $animWrapper.css('opacity', value);
  }

  const changeImage = () => {
    $bg.css('background-image', `url(/${bgNext.path})`);

    bgNext = getRandomImageInfo(presetInfo, imgBgJson) as ImageJson;

    $bgNext.css('background-image', `url(/${bgNext.path})`);
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

  if (presetInfo.skin === 'cyberpunk') {
    $progressBar.remove();
    setSkin('cyberpunk');
  } else {
    $progressBarCyberpunk.remove();
  }

  $progressBarsDull.hide();
  $progressBarsWrapper.show();
});
