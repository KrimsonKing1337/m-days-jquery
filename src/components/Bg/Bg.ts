import './Bg.scss';

import { getRandomImgPath } from './utils';

$(document).ready(() => {
  const $bg = $('.js-bg');
  const $animWrapper = $('.js-anim-wrapper');

  const changeOpacity = (value: string) => {
    $animWrapper.css('opacity', value);
  }

  const changeImage = () => {
    const randomImage = getRandomImgPath();

    $bg.css('background-image', `url(${randomImage})`);
  }

  changeImage();

  setInterval(() => {
    changeOpacity('0');

    setTimeout(() => {
      changeImage();
    }, 300); // transition duration

    setTimeout(() => {
      changeOpacity('1');
    }, 700)
  }, 12000);
});
