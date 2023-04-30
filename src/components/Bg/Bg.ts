import './Bg.scss';

import { getRandomImgPath } from './utils';

$(document).ready(() => {
  const $bg = $('.js-bg');
  const $bgNext = $('.js-bg-next');
  const $animWrapper = $('.js-anim-wrapper');

  let bgNext = getRandomImgPath();

  const changeOpacity = (value: string) => {
    $animWrapper.css('opacity', value);
  }

  const changeImage = () => {
    $bg.css('background-image', `url(${bgNext})`);

    bgNext = getRandomImgPath();

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
});
