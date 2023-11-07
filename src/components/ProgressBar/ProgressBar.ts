import 'url-search-params-polyfill';

import './ProgressBar.scss';

import { twoDigitsAlways, getValuesForProgressBar } from 'm-days-core/utils';

$(() => {
  const $parent = $('.js-progress-bar');

  const $year = $parent.find('.js-year');
  const $month = $parent.find('.js-month');
  const $hours = $parent.find('.js-hours');
  const $minutes = $parent.find('.js-minutes');
  const $seconds = $parent.find('.js-seconds');
  const $progressWalking = $parent.find('.js-progress-walking');
  const $day = $parent.find('.js-day-value');
  const $percent = $parent.find('.js-percent');
  const $percentFull = $parent.find('.js-percent-full');

  const $contentWrapperWithPercent = $parent.find('.js-content-wrapper.with-percent');
  const $contentWrapperNoPercent = $parent.find('.js-content-wrapper.no-percent');

  const noPercentParam = new URLSearchParams(window.location.search).get('no-percent');
  const noPercentValue = noPercentParam !== null;

  if (noPercentValue) {
    $parent.addClass('no-percent');

    $contentWrapperWithPercent.hide();
    $contentWrapperNoPercent.show();
  }

  const updateValues = () => {
    const values = getValuesForProgressBar();

    const {
      year,
      day,
      nameOfDay,
      month,
      hours,
      minutes,
      seconds,
      progressFull,
      dayOfYear,
      daysInYear,
      progressShort,
    } = values;

    const monthToPrint = twoDigitsAlways(month);
    const hoursToPrint = twoDigitsAlways(hours);
    const minutesToPrint = twoDigitsAlways(minutes);
    const secondsToPrint = twoDigitsAlways(seconds);

    $year.text(year);
    $month.text(`${day}.${monthToPrint} ${nameOfDay}`);
    $hours.text(`${hoursToPrint}:`);
    $minutes.text(minutesToPrint);
    $seconds.text(secondsToPrint);
    $day.text(`${dayOfYear} of ${daysInYear}`);
    $percent.text(`${progressShort}%`);
    $percentFull.text(`${progressFull}%`);

    $progressWalking.css('width', `${progressFull}%`);
  }

  updateValues();

  setInterval(() => {
    updateValues();
  }, 100);
});
