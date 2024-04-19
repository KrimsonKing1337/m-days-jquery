import { get } from 'lodash-es';

import { Preset } from '@types';

import { getRandomInt } from 'utils/getRandomInt';

import imgBgJson from 'img_bg.json';

const prefix = 'dynamic';

export function getRandomDynamicImage(presetInfo: Preset) {
  const { dynamicTopics, gifFormat } = presetInfo;

  const dynamicTopicsAsArr = dynamicTopics.split(', ');
  const gifFormatAsArr = gifFormat.split(', ');

  const randomDynamicTopicIndex = getRandomInt(0, dynamicTopicsAsArr.length - 1);
  const randomGifFormatIndex = getRandomInt(0, gifFormatAsArr.length - 1);

  const randomDynamicTopic = dynamicTopicsAsArr[randomDynamicTopicIndex];
  const randomGifFormat = gifFormatAsArr[randomGifFormatIndex];

  let dynamicImgPath = `${prefix}/${randomDynamicTopic}/${randomGifFormat}`;
  let dynamicImgPathWithoutSlashes = dynamicImgPath.replace(/\//g, '.');

  const randomDynamicImagesInOneFormat = get(imgBgJson, dynamicImgPathWithoutSlashes) || {};

  const randomDynamicImagesInOneSizeKeys = Object.keys(randomDynamicImagesInOneFormat);
  const randomDynamicImagesInOneSizeIndex = getRandomInt(0, randomDynamicImagesInOneSizeKeys.length - 1);
  const randomDynamicImagesSize = randomDynamicImagesInOneSizeKeys[randomDynamicImagesInOneSizeIndex];

  dynamicImgPath = `${prefix}/${randomDynamicTopic}/${randomGifFormat}/${randomDynamicImagesSize}`;
  dynamicImgPathWithoutSlashes = dynamicImgPath.replace(/\//g, '.');

  const randomDynamicImagesInOneSize = get(imgBgJson, dynamicImgPathWithoutSlashes) || {};

  const randomDynamicImagesValues = Object.values(randomDynamicImagesInOneSize);
  const randomDynamicImagesValuesIndex = getRandomInt(0, randomDynamicImagesValues.length - 1);

  return randomDynamicImagesValues[randomDynamicImagesValuesIndex];
}
