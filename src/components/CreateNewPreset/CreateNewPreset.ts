import type { AxiosError } from 'axios';

import type { Preset } from '@types';

import { deletePreset, putNewPreset } from 'api';

import './CreateNewPreset.scss';

import { fetchContentOptions } from './utils';

$(async () => {
  const configRootElement = document.querySelector('#config-root');

  if (!configRootElement) {
    return;
  }

  const contentOptions = await fetchContentOptions();

  const $presetNameDeleteInput = $('#input-delete') as JQuery<HTMLInputElement>;
  const $presetNameInput = $('#input') as JQuery<HTMLInputElement>;
  const $resolutionWInput = $('#input-w') as JQuery<HTMLInputElement>;
  const $resolutionHInput = $('#input-h') as JQuery<HTMLInputElement>;
  const $fileSizeInput = $('#input-file-size') as JQuery<HTMLInputElement>;

  const $skinSelect = $('#skin-select') as JQuery<HTMLSelectElement>;

  const $contentOptionsWrapper = $('.js-content-options-wrapper') as JQuery<HTMLDivElement>;
  const $contentStaticOptionsWrapper = $('.js-content-static-options-wrapper') as JQuery<HTMLDivElement>;
  const $contentDynamicOptionsWrapper = $('.js-content-dynamic-options-wrapper') as JQuery<HTMLDivElement>;

  const $deleteButton = $('.js-delete-button') as JQuery<HTMLButtonElement>;
  const $submitButton = $('.js-submit-button') as JQuery<HTMLButtonElement>;

  $contentOptionsWrapper.on('click', (e) => {
    $(e.currentTarget).toggleClass('isActive');
  });

  $deleteButton.on('click', async () => {
    if (!$presetNameDeleteInput.val()) {
      alert('There is no name for delete a preset!');

      return;
    }

    await deletePreset($presetNameDeleteInput.val() as string);
  });

  $submitButton.on('click', async () => {
    const chosenOptionsStaticElements = $('[name="static-chosen-ones"]:checked').get();
    const chosenOptionsDynamicElements = $('[name="dynamic-chosen-ones"]:checked').get();
    const chosenOptionsFormatsElements = $('[name="formats"]:checked').get();

    const staticOptionsArray: string[] = [];
    const dynamicOptionsArray: string[] = [];
    const formatsOptionsArray: string[] = [];

    chosenOptionsStaticElements.forEach(checkboxCur => {
      const $checkboxCur = $(checkboxCur);

      const key = $checkboxCur.data('key');
      let id = $checkboxCur.data('id');

      if (id.includes('__multi')) {
        id = id.replace('__multi', '');

        const allIdsOfMultiElements = $(`[name="static-chosen-ones"][data-id^="${id}_"]`).get();

        const allIdsOfMulti: string[] = [];

        [...allIdsOfMultiElements].forEach((cur) => {
          const $cur = $(cur);
          const id = $cur.data('id');

          if (id.includes('__multi')) {
            return;
          }

          const value = `${key}/${id}`;

          allIdsOfMulti.push(value);
        });

        staticOptionsArray.push(...allIdsOfMulti);
      } else {
        const value = `${key}/${id}`;

        staticOptionsArray.push(value);
      }
    });

    chosenOptionsDynamicElements.forEach(checkboxCur => {
      const $checkboxCur = $(checkboxCur);

      const key = $checkboxCur.data('key');
      const id = $checkboxCur.data('id');

      const value = `${key}/${id}`;

      dynamicOptionsArray.push(value);
    });

    chosenOptionsFormatsElements.forEach((formatCur) => {
      const $formatCur = $(formatCur);
      const id = $formatCur.data('id');

      formatsOptionsArray.push(id);
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
    const formats = formatsOptionsArray.join(', ');

    const name = $presetNameInput.val() as string;

    if (!$resolutionWInput.val() || !$resolutionHInput.val()) {
      alert('Resolution is not correct!');

      return;
    }

    const resolution = `${$resolutionWInput.val()}*${$resolutionHInput.val()}`;

    let skin = 'default';

    if ($skinSelect.val()) {
      skin = $skinSelect.val() as string;
    }

    const fileSize = $fileSizeInput.val() as string;

    const newPreset: Preset = {
      id: name,
      staticTopics,
      dynamicTopics,
      resolution,
      skin,
      formats,
      fileSize,
    };

    try {
      await putNewPreset(newPreset);
    } catch (error) {
      const err = error as AxiosError;

      alert(err.response?.data);
    }
  });

  Object.keys(contentOptions.static).forEach((key) => {
    const options = contentOptions.static[key] as string[];

    const $newCheckboxesWrapper = $(`<div class="CheckboxesWrapper"></div>`);
    const $newCheckboxesWrapperLabel = $(`<div class="CheckboxesWrapperLabel">${key}</div>`);

    $newCheckboxesWrapper.append($newCheckboxesWrapperLabel);

    $contentStaticOptionsWrapper.append($newCheckboxesWrapper);

    options.forEach((optionCur) => {
      const $newCheckboxWrapper = $('<div class="CheckboxWrapper js-checkbox-wrapper">');
      const $newLabel = $(`<label for="static-${optionCur}">${optionCur}</label>`);

      const $newCheckbox = $('<input />', {
        type: 'checkbox',
        'id': `static-${optionCur}`,
        name: 'static-chosen-ones',
        'data-key': key,
        'data-id': optionCur,
        'data-type': 'static',
      });

      $newCheckboxesWrapper.append($newCheckboxWrapper);

      $newCheckboxWrapper.append($newLabel);
      $newCheckboxWrapper.append($newCheckbox);
    });
  });

  Object.keys(contentOptions.gif).forEach((key) => {
    const options = contentOptions.gif[key] as string[];

    const $newCheckboxesWrapper = $(`<div class="CheckboxesWrapper"></div>`);
    const $newCheckboxesWrapperLabel = $(`<div class="CheckboxesWrapperLabel">${key}</div>`);

    $newCheckboxesWrapper.append($newCheckboxesWrapperLabel);

    $contentDynamicOptionsWrapper.append($newCheckboxesWrapper);

    options.forEach((optionCur) => {
      const $newCheckboxWrapper = $('<div class="CheckboxWrapper js-checkbox-wrapper">');
      const $newLabel = $(`<label for="dynamic-${optionCur}">${optionCur}</label>`);

      const $newCheckbox = $('<input />', {
        type: 'checkbox',
        'id': `dynamic-${optionCur}`,
        name: 'dynamic-chosen-ones',
        'data-key': key,
        'data-id': optionCur,
        'data-type': 'dynamic',
      });

      $newCheckboxesWrapper.append($newCheckboxWrapper);

      $newCheckboxWrapper.append($newLabel);
      $newCheckboxWrapper.append($newCheckbox);
    });
  });

  // элементы получаем именно здесь, потому что до этого их не существует
  const $checkBoxWrappers = $('.js-checkbox-wrapper') as JQuery<HTMLDivElement>;

  $checkBoxWrappers.on('click', (e) => {
    e.stopPropagation();
  });
});
