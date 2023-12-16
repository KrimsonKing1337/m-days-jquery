import './ProgressBarVaporwave.scss';

import { twoDigitsAlways, getValuesForProgressBar } from 'm-days-core/utils';

import { Themes } from '@types';

import { getPercentForDay } from './utils';

$(() => {
  const theme = new URLSearchParams(window.location.search).get('theme');

  const $parent = $('.js-progress-bar-vaporwave');

  if (theme !== Themes.vaporwave) {
    $parent.remove();

    return;
  }

  const $date = $parent.find('.js-date');
  const $time = $parent.find('.js-time');
  const $progressWalking = $parent.find('.js-progress-walking');

  const updateValues = () => {
    const fullValues = getValuesForProgressBar();
    const percentForDay = getPercentForDay();

    const {
      year,
      day,
      month,
      hours,
      minutes,
    } = fullValues;

    const dayToPrint = twoDigitsAlways(day);
    const monthToPrint = twoDigitsAlways(month);
    const hoursToPrint = twoDigitsAlways(hours);
    const minutesToPrint = twoDigitsAlways(minutes);

    $date.text(`${dayToPrint}.${monthToPrint}.${year}`);
    $time.text(`${hoursToPrint}:${minutesToPrint}`);

    $progressWalking.css('width', `${percentForDay}%`);
  }

  updateValues();

  setInterval(() => {
    updateValues();
  }, 500);
});
