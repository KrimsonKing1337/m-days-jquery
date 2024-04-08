import type { Preset } from '@types';

import './CreateNewPreset.scss';

import { fetchContentOptions } from './utils';
import { putNewPreset } from 'api';
import { AxiosError } from 'axios';


$(async () => {
  const contentOptions = await fetchContentOptions();

  const $presetNameInput = $('#input') as JQuery<HTMLInputElement>;
  const $resolutionWInput = $('#input-w') as JQuery<HTMLInputElement>;
  const $resolutionHInput = $('#input-h') as JQuery<HTMLInputElement>;

  const $skinSelect = $('#skin-select') as JQuery<HTMLSelectElement>;

  const $contentOptionsWrapper = $('.js-content-options-wrapper') as JQuery<HTMLDivElement>;
  const $contentStaticOptionsWrapper = $('.js-content-static-options-wrapper') as JQuery<HTMLDivElement>;
  const $contentDynamicOptionsWrapper = $('.js-content-dynamic-options-wrapper') as JQuery<HTMLDivElement>;

  const $button = $('.js-button') as JQuery<HTMLButtonElement>;

  $contentOptionsWrapper.on('click', (e) => {
    $(e.currentTarget).toggleClass('isActive');
  });

  $button.on('click', async () => {
    const chosenOptionsStaticElements = $('[name="static-chosen-ones"]:checked').get();
    const chosenOptionsDynamicElements = $('[name="dynamic-chosen-ones"]:checked').get();

    const staticOptionsArray: string[] = [];
    const dynamicOptionsArray: string[] = [];

    chosenOptionsStaticElements.forEach(checkboxCur => {
      const omitId = checkboxCur.id.substring(7); // static-

      staticOptionsArray.push(omitId);
    });

    chosenOptionsDynamicElements.forEach(checkboxCur => {
      const omitId = checkboxCur.id.substring(8); // dynamic-

      dynamicOptionsArray.push(omitId);
    });

    if (!$presetNameInput.val()) {
      alert('The name cannot be empty!');

      return;
    }

    if (staticOptionsArray.length === 0 && dynamicOptionsArray.length === 0) {
      alert('There are no chosen static or dynamic options!');

      return;
    }

    const staticTopics = staticOptionsArray.join(', ');
    const dynamicTopics = dynamicOptionsArray.join(', ');

    const name = $presetNameInput.val() as string;

    let resolution = '';

    if ($resolutionWInput.val() && $resolutionHInput.val()) {
      resolution += `w: ${$resolutionWInput.val()}, `;
      resolution += `h: ${$resolutionHInput.val()}`;
    }

    let skin = 'default';

    if ($skinSelect.val()) {
      skin = $skinSelect.val() as string;
    }

    const newPreset: Preset = {
      id: name,
      staticTopics,
      dynamicTopics,
      resolution,
      skin,
    };

    try {
      await putNewPreset(newPreset);
    } catch (error) {
      const err = error as AxiosError;

      alert(err.response?.data);
    }
  });

  Object.keys(contentOptions).forEach((key) => {
    const options = contentOptions[key] as string[];

    const $newCheckboxesWrapper = $(`<div class="CheckboxesWrapper"></div>`);
    const $newCheckboxesWrapperLabel = $(`<div class="CheckboxesWrapperLabel">${key}</div>`);

    $newCheckboxesWrapper.append($newCheckboxesWrapperLabel);

    $contentStaticOptionsWrapper.append($newCheckboxesWrapper);

    options.forEach((optionCur) => {
      const $newCheckboxWrapper = $('<div class="CheckboxWrapper">');
      const $newLabel = $(`<label for="static-${optionCur}">${optionCur}</label>`);

      const $newCheckbox = $('<input />', {
        type: 'checkbox',
        'id': `static-${optionCur}`,
        name: 'static-chosen-ones',
      });

      $newCheckboxesWrapper.append($newCheckboxWrapper);

      $newCheckboxWrapper.append($newLabel);
      $newCheckboxWrapper.append($newCheckbox);
    });
  });

  Object.keys(contentOptions).forEach((key) => {
    const options = contentOptions[key] as string[];

    const $newCheckboxesWrapper = $(`<div class="CheckboxesWrapper"></div>`);
    const $newCheckboxesWrapperLabel = $(`<div class="CheckboxesWrapperLabel">${key}</div>`);

    $newCheckboxesWrapper.append($newCheckboxesWrapperLabel);

    $contentDynamicOptionsWrapper.append($newCheckboxesWrapper);

    options.forEach((optionCur) => {
      const $newCheckboxWrapper = $('<div class="CheckboxWrapper">');
      const $newLabel = $(`<label for="dynamic-${optionCur}">${optionCur}</label>`);

      const $newCheckbox = $('<input />', {
        type: 'checkbox',
        'id': `dynamic-${optionCur}`,
        name: 'dynamic-chosen-ones',
      });

      $newCheckboxesWrapper.append($newCheckboxWrapper);

      $newCheckboxWrapper.append($newLabel);
      $newCheckboxWrapper.append($newCheckbox);
    });
  });
});
