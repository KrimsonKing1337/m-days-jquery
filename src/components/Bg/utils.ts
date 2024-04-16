import { get } from 'lodash-es';

import { getBg } from 'api';
import { getRandomInt } from 'utils/getRandomInt';

import imgBgJson from 'img_bg.json';

export const fetchImage = async () => {
  const image = await getBg();

  return JSON.stringify(image.data);
};

export const getRandomStaticImage = () => {
  const staticTopics = 'anime/attack-on-titan, anime/ghost-in-the-shell, anime/hayao-miyazaki/tonari-no-totoro, anime/makoto-shinkai/byousoku-5-centimeter, anime/hellsing-ultimate, anime/fullmetal-alchemist, anime/fullmetal-alchemist-brotherhood, series/doctor-who, series/star-trek, series/too-old-to-die-young, series/the-10th-kingdom, cartoons/avatar-the-last-airbender, cartoons/the-legend-of-korra';

  const width = '1920, 1600, 1280';

  const topicsAsArr = staticTopics.split(', ');
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

  return randomStaticImagesValues[randomStaticImagesValuesIndex];
}
