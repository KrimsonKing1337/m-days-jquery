import { getContentOptions } from 'api';

export const fetchContentOptions = async () => {
  const result = await getContentOptions();

  return result.data;
};
