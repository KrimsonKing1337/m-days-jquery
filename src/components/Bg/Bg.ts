import './Bg.scss';

import { fetchImage } from './utils';

$(async () => {
  const $bg = $('.js-bg');
  const $bgNext = $('.js-bg-next');
  const $animWrapper = $('.js-anim-wrapper');

  let bgNext = await fetchImage();

  const changeOpacity = (value: string) => {
    $animWrapper.css('opacity', value);
  }

  const changeImage = async () => {
    $bg.css('background-image', `url(${bgNext})`);

    bgNext = await fetchImage();

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
