import './Bg.scss';

import { getRandomImage } from './utils';
import { getInfoAboutPreset } from 'api';


$(async () => {
  const $bg = $('.js-bg');
  const $bgNext = $('.js-bg-next');
  const $animWrapper = $('.js-anim-wrapper');
  const $progressBarsWrapper = $('.js-progress-bars-wrapper');
  const $progressBarsDull = $('.js-progress-bars-dull');

  const searchParams = new URLSearchParams(window.location.search);
  const preset = searchParams.get('preset') || 'default'; // todo: добавить в бд информацию о дефолтном пресете

  const presetInfo = await getInfoAboutPreset(preset);

  let bgNext = getRandomImage(presetInfo);

  const changeOpacity = (value: string) => {
    $animWrapper.css('opacity', value);
  }

  const changeImage = () => {
    $bg.css('background-image', `url(${bgNext})`);

    bgNext = getRandomImage(presetInfo);

    $bgNext.css('background-image', `url(${bgNext})`);
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
