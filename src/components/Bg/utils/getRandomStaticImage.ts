import { get } from 'lodash-es';

import { Preset } from '@types';

import { getRandomInt } from 'utils/getRandomInt';

import imgBgJson from 'img_bg.json';

const prefix = 'static';

export function getRandomStaticImage(presetInfo: Preset) {
  const { staticTopics, width } = presetInfo;

  const staticTopicsAsArr = staticTopics.split(', ');
  const widthAsArr = width.split(', ');

  const randomStaticTopicIndex = getRandomInt(0, staticTopicsAsArr.length - 1);
  const randomWidthIndex = getRandomInt(0, widthAsArr.length - 1);
  const randomStaticTopic = staticTopicsAsArr[randomStaticTopicIndex];
  const randomWidth = widthAsArr[randomWidthIndex];

  let staticImgPath = `${prefix}/${randomStaticTopic}/${randomWidth}`;

  let staticImgPathWithoutSlashes = staticImgPath.replace(/\//g, '.');

  let randomStaticImagesInOneWidth = get(imgBgJson, staticImgPathWithoutSlashes);

  if (!randomStaticImagesInOneWidth) {
    staticImgPath = `${prefix}/${randomStaticTopic}`;
    staticImgPathWithoutSlashes = staticImgPath.replace(/\//g, '.');
    randomStaticImagesInOneWidth = get(imgBgJson, staticImgPathWithoutSlashes);

    const randomStaticImagesInOneWidthKeys = Object.keys(randomStaticImagesInOneWidth);
    const randomStaticImagesWidth = randomStaticImagesInOneWidthKeys[randomStaticImagesInOneWidthKeys.length - 1];

    staticImgPath = `${prefix}/${randomStaticTopic}/${randomStaticImagesWidth}`;
    staticImgPathWithoutSlashes = staticImgPath.replace(/\//g, '.');

    randomStaticImagesInOneWidth = get(imgBgJson, staticImgPathWithoutSlashes);
  }

  const randomStaticImagesValues = Object.values(randomStaticImagesInOneWidth);
  const randomStaticImagesValuesIndex = getRandomInt(0, randomStaticImagesValues.length - 1);

  return randomStaticImagesValues[randomStaticImagesValuesIndex];
}
