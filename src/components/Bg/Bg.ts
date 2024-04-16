import { get } from 'lodash-es';

import './Bg.scss';

import imgBgJson from 'img_bg.json';

import { getRandomInt } from 'utils/getRandomInt';

$(async () => {
  const $bg = $('.js-bg');
  const $progressBarsWrapper = $('.js-progress-bars-wrapper');
  const $progressBarsDull = $('.js-progress-bars-dull');

  // todo: делаем запрос на static topics, dynamic topics и width для пресета

  const topics = 'anime/attack-on-titan, anime/ghost-in-the-shell, anime/hayao-miyazaki/tonari-no-totoro, anime/makoto-shinkai/byousoku-5-centimeter, anime/hellsing-ultimate, anime/fullmetal-alchemist, anime/fullmetal-alchemist-brotherhood, series/doctor-who, series/star-trek, series/too-old-to-die-young, series/the-10th-kingdom, cartoons/avatar-the-last-airbender, cartoons/the-legend-of-korra';

  const width = '1920, 1600, 1280';

  const topicsAsArr = topics.split(', ');
  const widthAsArr = width.split(', ');

  const randomTopicIndex = getRandomInt(0, topicsAsArr.length - 1);
  const randomWidthIndex = getRandomInt(0, widthAsArr.length - 1);

  const randomTopic = topicsAsArr[randomTopicIndex];
  const randomWidth = widthAsArr[randomWidthIndex];

  const imgPath = `static/${randomTopic}/${randomWidth}`;
  const imgPathWithoutSlashes = imgPath.replace(/\//g, '.');

  const randomStaticImagesInOneWidth = get(imgBgJson, imgPathWithoutSlashes);

  const randomStaticImagesValues = Object.values(randomStaticImagesInOneWidth);
  const randomStaticImagesValuesIndex = getRandomInt(0, randomStaticImagesValues.length - 1);
  const randomStaticImage = randomStaticImagesValues[randomStaticImagesValuesIndex];

  $bg.css('background-image', `url(${randomStaticImage})`);

  $progressBarsDull.hide();
  $progressBarsWrapper.show();
});
