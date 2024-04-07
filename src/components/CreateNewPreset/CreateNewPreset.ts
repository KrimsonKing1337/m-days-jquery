import type { Preset } from '@types';

import './CreateNewPreset.scss';

import { fetchContentOptions } from './utils';
import { putNewPreset } from 'api';
import { AxiosError } from 'axios';


$(async () => {
  const contentOptions = await fetchContentOptions();

  const $input = $('#input') as JQuery<HTMLInputElement>;
  const $contentOptionsWrapper = $('.js-content-options-wrapper') as JQuery<HTMLDivElement>;
  const $button = $('.js-button') as JQuery<HTMLButtonElement>;

  $button.on('click', async () => {
    const chosenOptionsElements = $('[name="chosen-ones"]:checked').get();

    const optionsArray: string[] = [];

    chosenOptionsElements.forEach(checkboxCur => {
      optionsArray.push(checkboxCur.id);
    });

    if (!$input.val()) {
      alert('The name cannot be empty!');

      return;
    }

    if (optionsArray.length === 0) {
      alert('There are no chosen options!');

      return;
    }

    const topics = optionsArray.join(', ');
    const name = $input.val() as string;

    const newPreset: Preset = {
      id: name,
      staticTopics: topics,
    };

    try {
      await putNewPreset(newPreset);
    } catch (error) {
      const err = error as AxiosError;

      alert(err.response?.data);
    }
    // todo: то же самое сделать и для dynamicTopics, skins и так далее
  });

  Object.keys(contentOptions).forEach((key) => {
    const options = contentOptions[key] as string[];

    const $newCheckboxesWrapper = $(`<div class="CheckboxesWrapper"></div>`);
    const $newCheckboxesWrapperLabel = $(`<div class="CheckboxesWrapperLabel">${key}</div>`);

    $newCheckboxesWrapper.append($newCheckboxesWrapperLabel);
    $contentOptionsWrapper.append($newCheckboxesWrapper);

    options.forEach((optionCur) => {
      const $newCheckboxWrapper = $('<div>');
      const $newLabel = $(`<label for="${optionCur}">${optionCur}</label>`);
      const $newCheckbox = $('<input />', { type: 'checkbox', 'id': optionCur, name: 'chosen-ones' });

      $newCheckboxesWrapper.append($newCheckboxWrapper);

      $newCheckboxWrapper.append($newLabel);
      $newCheckboxWrapper.append($newCheckbox);
    });
  });
});
