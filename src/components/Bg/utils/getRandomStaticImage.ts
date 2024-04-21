import { get } from 'lodash-es';

import { Preset } from '@types';

import { getRandomInt } from 'utils/getRandomInt';

import imgBgJson from 'img_bg.json';
import { getWidths } from './getWidths';

const prefix = 'static';

export function getRandomStaticImage(presetInfo: Preset) {
  const { staticTopics, resolution, formats } = presetInfo;

  const widthAsArr = getWidths(resolution);
  const staticTopicsAsArr = staticTopics.split(', ');
  const formatAsArr = formats.split(', ');

  const randomStaticTopicIndex = getRandomInt(0, staticTopicsAsArr.length - 1);
  const randomFormatIndex = getRandomInt(0, formatAsArr.length - 1);
  const randomWidthIndex = getRandomInt(0, widthAsArr.length - 1);
  const randomStaticTopic = staticTopicsAsArr[randomStaticTopicIndex];
  const randomWidth = widthAsArr[randomWidthIndex];
  const randomFormat = formatAsArr[randomFormatIndex];

  let staticImgPath = `${prefix}/${randomStaticTopic}/${randomFormat}/${randomWidth}`;

  let staticImgPathWithoutSlashes = staticImgPath.replace(/\//g, '.');

  let randomStaticImagesInOneWidth = get(imgBgJson, staticImgPathWithoutSlashes);

  if (!randomStaticImagesInOneWidth) {
    const availableFormatsPath = `${prefix}/${randomStaticTopic}`.replace(/\//g, '.');
    const availableFormatsObj = get(imgBgJson, availableFormatsPath);

    const availableFormats = Object.keys(availableFormatsObj);
    const randomAvailableFormatIndex = getRandomInt(0, availableFormats.length - 1);
    const randomAvailableFormat = availableFormats[randomAvailableFormatIndex];

    staticImgPath = `${prefix}/${randomStaticTopic}/${randomAvailableFormat}`;
    staticImgPathWithoutSlashes = staticImgPath.replace(/\//g, '.');

    randomStaticImagesInOneWidth = get(imgBgJson, staticImgPathWithoutSlashes);

    const randomStaticImagesInOneWidthKeys = Object.keys(randomStaticImagesInOneWidth);
    const randomStaticImagesWidth = randomStaticImagesInOneWidthKeys[randomStaticImagesInOneWidthKeys.length - 1];

    staticImgPath = `${prefix}/${randomStaticTopic}/${randomAvailableFormat}/${randomStaticImagesWidth}`;
    staticImgPathWithoutSlashes = staticImgPath.replace(/\//g, '.');

    randomStaticImagesInOneWidth = get(imgBgJson, staticImgPathWithoutSlashes);
  }

  const randomStaticImagesValues = Object.values(randomStaticImagesInOneWidth);
  const randomStaticImagesValuesIndex = getRandomInt(0, randomStaticImagesValues.length - 1);

  return randomStaticImagesValues[randomStaticImagesValuesIndex];
}
