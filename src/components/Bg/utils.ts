import { get } from 'lodash-es';

import { getBg } from 'api';
import { getRandomInt } from 'utils/getRandomInt';

import imgBgJson from 'img_bg.json';
import { Preset } from '../../@types';

export const fetchImage = async () => {
  const image = await getBg();

  return JSON.stringify(image.data);
};

export const getRandomImage = (presetInfo: Preset) => {
  const {
    staticTopics,
    dynamicTopics,
    width,
    gifFormat,
  } = presetInfo;

  const staticTopicsAsArr = staticTopics.split(', ');

  const widthAsArr = width.split(', ');

  const dynamicTopicsAsArr = dynamicTopics.split(', ');
  const gifFormatAsArr = gifFormat.split(', ');

  const randomStaticTopicIndex = getRandomInt(0, staticTopicsAsArr.length - 1);
  const randomDynamicTopicIndex = getRandomInt(0, dynamicTopicsAsArr.length - 1);

  const randomWidthIndex = getRandomInt(0, widthAsArr.length - 1);
  const randomGifFormatIndex = getRandomInt(0, gifFormatAsArr.length - 1);

  const randomStaticTopic = staticTopicsAsArr[randomStaticTopicIndex];
  const randomWidth = widthAsArr[randomWidthIndex];

  const randomDynamicTopic = dynamicTopicsAsArr[randomDynamicTopicIndex];
  const randomGifFormat = gifFormatAsArr[randomGifFormatIndex];

  let staticImgPath = `static/${randomStaticTopic}/${randomWidth}`;

  let staticImgPathWithoutSlashes = staticImgPath.replace(/\//g, '.');

  let dynamicImgPath = `dynamic/${randomDynamicTopic}/${randomGifFormat}`;
  let dynamicImgPathWithoutSlashes = dynamicImgPath.replace(/\//g, '.');

  let randomStaticImagesInOneWidth = get(imgBgJson, staticImgPathWithoutSlashes);

  if (!randomStaticImagesInOneWidth) {
    staticImgPath = `static/${randomStaticTopic}`;
    staticImgPathWithoutSlashes = staticImgPath.replace(/\//g, '.');
    randomStaticImagesInOneWidth = get(imgBgJson, staticImgPathWithoutSlashes);

    const randomStaticImagesInOneWidthKeys = Object.keys(randomStaticImagesInOneWidth);
    const randomStaticImagesWidth = randomStaticImagesInOneWidthKeys[randomStaticImagesInOneWidthKeys.length - 1];

    staticImgPath = `static/${randomStaticTopic}/${randomStaticImagesWidth}`;
    staticImgPathWithoutSlashes = staticImgPath.replace(/\//g, '.');

    randomStaticImagesInOneWidth = get(imgBgJson, staticImgPathWithoutSlashes);
  }

  const randomDynamicImagesInOneFormat = get(imgBgJson, dynamicImgPathWithoutSlashes) || {};

  const randomDynamicImagesInOneSizeKeys = Object.keys(randomDynamicImagesInOneFormat);
  const randomDynamicImagesInOneSizeIndex = getRandomInt(0, randomDynamicImagesInOneSizeKeys.length - 1);
  const randomDynamicImagesSize = randomDynamicImagesInOneSizeKeys[randomDynamicImagesInOneSizeIndex];

  dynamicImgPath = `dynamic/${randomDynamicTopic}/${randomGifFormat}/${randomDynamicImagesSize}`;
  dynamicImgPathWithoutSlashes = dynamicImgPath.replace(/\//g, '.');

  const randomDynamicImagesInOneSize = get(imgBgJson, dynamicImgPathWithoutSlashes) || {};

  const randomStaticImagesValues = Object.values(randomStaticImagesInOneWidth);
  const randomStaticImagesValuesIndex = getRandomInt(0, randomStaticImagesValues.length - 1);

  const randomDynamicImagesValues = Object.values(randomDynamicImagesInOneSize);
  const randomDynamicImagesValuesIndex = getRandomInt(0, randomDynamicImagesValues.length - 1);

  const randomStaticImage = randomStaticImagesValues[randomStaticImagesValuesIndex];
  const randomDynamicImage = randomDynamicImagesValues[randomDynamicImagesValuesIndex];

  if (randomStaticImage && randomDynamicImage) {
    const randomInt = getRandomInt(0, 1);

    if (randomInt === 0) {
      return randomDynamicImage;
    }

    return randomStaticImage;
  }

  if (randomDynamicImage && !randomStaticImage) {
    return randomDynamicImage;
  }

  return randomStaticImage;
}
