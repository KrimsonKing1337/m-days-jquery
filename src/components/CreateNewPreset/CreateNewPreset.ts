import './CreateNewPreset.scss';

import { fetchContentOptions } from './utils';
import { putNewPreset } from '../../api';
import { Preset } from '../../@types';

$(async () => {
  const contentOptions = await fetchContentOptions();

  const $input = $('#input') as JQuery<HTMLInputElement>;
  const $select = $('#select') as JQuery<HTMLSelectElement>;
  const $checkboxesWrapper = $('.js-checkboxes-wrapper') as JQuery<HTMLDivElement>;
  const $button = $('.js-button') as JQuery<HTMLButtonElement>;

  $button.on('click', async () => {
    const chosenOptionsElements = $('[name="chosen-ones"]:checked').get();

    const result: string[] = [];

    chosenOptionsElements.forEach(checkboxCur => {
      result.push(checkboxCur.id);
    });

    if (!$input.val()) {
      alert('The name cannot be empty!');

      return;
    }

    if (result.length === 0) {
      alert('There are no chosen options!');

      return;
    }

    const topics = result.join(', ');
    const name = $input.val() as string;

    const newPreset: Preset = {
      id: name,
      staticTopics: topics,
    };

    await putNewPreset(newPreset);

    // todo: если уже есть пресет с таким названием - обрабатывать ошибку
  });

  Object.keys(contentOptions).forEach((key) => {
    const $newOption = $('<option>', { label: key, value: key });

    $select.append($newOption);
  });

  $select.on('change', (e) => {
    const { value } = e.target;

    const options = contentOptions[value] as string[];

    $checkboxesWrapper.empty();

    options.forEach((optionCur) => {
      const $newCheckboxWrapper = $('<div>', { 'class': 'NewCheckboxWrapper' });
      const $newLabel = $(`<label for="${optionCur}">${optionCur}</label>`);
      const $newCheckbox = $('<input />', { type: 'checkbox', 'id': optionCur, name: 'chosen-ones' });

      $checkboxesWrapper.append($newCheckboxWrapper);

      $newCheckboxWrapper.append($newLabel);
      $newCheckboxWrapper.append($newCheckbox);
    });
  });
});
