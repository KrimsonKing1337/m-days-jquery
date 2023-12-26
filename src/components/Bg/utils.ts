import { getBg } from 'api';

export const fetchImage = async () => {
  const image = await getBg();

  return JSON.stringify(image.data);
};
