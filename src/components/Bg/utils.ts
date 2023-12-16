import { getBg } from 'api';

export const fetchImage = async () => {
  const image = await getBg();

  return URL.createObjectURL(image.data);
};
