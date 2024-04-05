import { fetchContentOptions } from './utils';

$(async () => {
  const contentOptions = await fetchContentOptions();

  console.log('___ contentOptions', contentOptions);
});
