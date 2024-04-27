import { getRandomInt } from 'utils/getRandomInt';

import { getRandomStaticImage } from './getRandomStaticImage';
import { getRandomDynamicImage } from './getRandomDynamicImage';

import { Preset } from '@types';

export const getRandomImage = (presetInfo: Preset) => {
  const randomStaticImage = getRandomStaticImage(presetInfo);
  const randomDynamicImage = getRandomDynamicImage(presetInfo);

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

export const getFormats = () => {
  if (window.innerHeight > window.innerWidth) {
    return ['h', 'v', 'sq'];
  }

  if (window.innerWidth > window.innerHeight) {
    return ['h', 'sq'];
  }

  return ['h', 'v', 'sq'];
};
