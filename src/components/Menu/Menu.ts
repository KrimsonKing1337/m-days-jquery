import 'url-search-params-polyfill';

import './Menu.scss';

type Checkbox = {
  id: string;
  label: string;
};

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

$(() => {
  const $checkboxesWrapper = $('.js-checkboxes-wrapper');

  const $menu = $('.js-menu');
  const $menuButton = $('.js-menu-button');
  const $menuButtonApply = $('.js-menu-button-apply');

  const searchParams = new URLSearchParams(window.location.search);
  const preset = searchParams.get('preset') || 'default';

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

    const { href } = window.location;
    const hrefWithoutParams = href.split('?')[0];

    window.location.href = `${hrefWithoutParams}${params}&preset=${preset}`;
  });
});
