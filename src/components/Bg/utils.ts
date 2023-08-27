import { getRandomImgPath as getRandomImgPathOriginal } from 'm-days-core/utils';
import imgs from 'img_bg.json';

export function getRandomImgPath() {
  return getRandomImgPathOriginal(imgs);
}
