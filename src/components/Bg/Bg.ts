import 'url-search-params-polyfill';

import './Bg.scss';

import type { ImageJson } from 'm-days-core/@types.js';
import { getRandomImageInfo } from 'm-days-core/utils/getRandomImageInfo/getRandomImageInfo';

import { getInfoAboutPreset } from 'api';
import { setSkin } from '../Weather/Weather';

import imgBgJson from 'img_bg.json';

type Checkbox = {
  id: string;
  label: string;
};

$(async () => {
  const rootElement = document.querySelector('#root');

  if (!rootElement) {
    return;
  }

  const $bg = $('.js-bg');
  const $bgNext = $('.js-bg-next');
  const $animWrapper = $('.js-anim-wrapper');
  const $progressBarsWrapper = $('.js-progress-bars-wrapper');
  const $progressBarsDull = $('.js-progress-bars-dull');

  const $progressBar = $('.js-progress-bar');
  const $progressBarCyberpunk = $('.js-progress-bar-vaporwave');

  const $checkboxesWrapper = $('.js-checkboxes-wrapper');

  const $menu = $('.js-menu');
  const $menuButton = $('.js-menu-button');
  const $menuButtonApply = $('.js-menu-button-apply');

  const searchParams = new URLSearchParams(window.location.search);
  const preset = searchParams.get('preset') || 'default';

  const presetInfo = await getInfoAboutPreset(preset);

  let bgNext = getRandomImageInfo(presetInfo, imgBgJson) as ImageJson;

  const changeOpacity = (value: string) => {
    $animWrapper.css('opacity', value);
  }

  const changeImage = () => {
    $bg.css('background-image', `url(/${bgNext.path})`);

    bgNext = getRandomImageInfo(presetInfo, imgBgJson) as ImageJson;

    $bgNext.css('background-image', `url(/${bgNext.path})`);
  }

  changeImage();

  setInterval(() => {
    changeOpacity('0');

    setTimeout(() => {
      changeImage();
    }, 300); // transition duration

    setTimeout(() => {
      changeOpacity('1');
    }, 700);
  }, 12000);

  if (presetInfo.skin === 'cyberpunk') {
    $progressBar.remove();
    setSkin('cyberpunk');
  } else {
    $progressBarCyberpunk.remove();
  }

  const checkboxes: Checkbox[] = [
    {
      id: 'noPercent',
      label: 'no percent',
    },
    {
      id: 'noGui',
      label: 'no gui',
    },
  ];

  checkboxes.forEach((checkboxCur) => {
    const { id, label } = checkboxCur;

    const $wrapper = $('<div class="MenuCheckbox js-checkbox-wrapper"></div>');

    const $label = $(`<label for="${id}">${label}</label>`);
    const $checkbox = $(`<input id="${id}" type="checkbox" />`);

    $wrapper.append($label);
    $wrapper.append($checkbox);

    $checkboxesWrapper.append($wrapper);
  });

  $menuButton.on('click', () => {
    if ($menu.is(':hidden')) {
      $menu.css('display', 'flex');
    } else {
      $menu.css('display', 'none');
    }
  });

  $menuButtonApply.on('click', () => {
    const noPercentValue = $('#noPercent').is(':checked');
    const noGuiValue = $('#noGui').is(':checked');
    const percentUpdate = $('#input-update-speed').val();

    let params = '?';

    if (noPercentValue) {
      params += '&no-percent';
    }

    if (noGuiValue) {
      params += '&no-gui';
    }

    if (percentUpdate !== '100') {
      params += `&percent-update-speed=${percentUpdate}`;
    }

    if (params[1] === '&') {
      params = params.replace('&', '');
    }

    window.location.href = `/${params}`;
  });

  $progressBarsDull.hide();
  $progressBarsWrapper.show();
});
