import './ProgressBarVaporwave.scss';

import { twoDigitsAlways, getValuesForProgressBar } from 'm-days-core/utils';

import { getPercentForDay } from './utils';

$(() => {
  const rootElement = document.querySelector('#root');

  if (!rootElement) {
    return;
  }

  const $parent = $('.js-progress-bar-vaporwave');

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
