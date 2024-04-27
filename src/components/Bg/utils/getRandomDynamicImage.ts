import { get } from 'lodash-es';

import { Preset } from '@types';

import { getRandomInt } from 'utils/getRandomInt';

import imgBgJson from 'img_bg.json';
import { getFormats } from './utils';

const prefix = 'dynamic';

export function getRandomDynamicImage(presetInfo: Preset) {
  const { dynamicTopics } = presetInfo;

  const dynamicTopicsAsArr = dynamicTopics.split(', ');
  const formats = getFormats();

  const randomDynamicTopicIndex = getRandomInt(0, dynamicTopicsAsArr.length - 1);
  const randomFormatIndex = getRandomInt(0, formats.length - 1);

  const randomDynamicTopic = dynamicTopicsAsArr[randomDynamicTopicIndex];
  const randomFormat = formats[randomFormatIndex];

  let dynamicImgPath = `${prefix}/${randomDynamicTopic}/${randomFormat}`;
  let dynamicImgPathWithoutSlashes = dynamicImgPath.replace(/\//g, '.');

  const randomDynamicImagesInOneFormat = get(imgBgJson, dynamicImgPathWithoutSlashes) || {};

  const randomDynamicImagesInOneSizeKeys = Object.keys(randomDynamicImagesInOneFormat);
  const randomDynamicImagesInOneSizeIndex = getRandomInt(0, randomDynamicImagesInOneSizeKeys.length - 1);
  const randomDynamicImagesSize = randomDynamicImagesInOneSizeKeys[randomDynamicImagesInOneSizeIndex];

  dynamicImgPath = `${prefix}/${randomDynamicTopic}/${randomFormat}/${randomDynamicImagesSize}`;
  dynamicImgPathWithoutSlashes = dynamicImgPath.replace(/\//g, '.');

  const randomDynamicImagesInOneSize = get(imgBgJson, dynamicImgPathWithoutSlashes) || {};

  const randomDynamicImagesValues = Object.values(randomDynamicImagesInOneSize);
  const randomDynamicImagesValuesIndex = getRandomInt(0, randomDynamicImagesValues.length - 1);

  return randomDynamicImagesValues[randomDynamicImagesValuesIndex];
}
