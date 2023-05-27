import './Weather.scss';

import type { AxiosError } from 'axios';
import type { WeatherResp } from '@types';

import { getCurrentPosition } from 'utils/gpsApi';
import { getCurrentWeather } from 'api';
import { printObject } from 'utils/printObject';

function catchError(error: AxiosError) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(`1: ${error.response.data}`);
    console.log(`2: ${error.response.status}`);
    console.log(`3: ${error.response.headers}`);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log('4');
    printObject(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }

  console.log('5');
  printObject(error.config);
}

async function updateWeather() {
  const $weather = $('.js-weather');
  const $weatherIcon = $weather.find('.js-weather-icon');
  const $weatherTemp = $weather.find('.js-weather-temp');

  const geoLocation = await getCurrentPosition();

  const { latitude, longitude } = geoLocation;

  /*
  * здесь я дважды делаю запрос на получение погоды из-за политики браузеров.
  * старая сафари позволяет делать запросы на http, когда основной домен в https.
  * новые браузеры так не дают сделать.
  * но https нужен для геолокации, если зайти с http - она работать не будет
  * (по крайней мере, на сафари так)
  * */

  let weather: WeatherResp | null = null;

  try {
    weather = await getCurrentWeather({ latitude, longitude, protocol: 'http' });
  } catch (e) {
    const error = e as AxiosError;

    catchError(error);
  }

  if (!weather) {
    try {
      weather = await getCurrentWeather({ latitude, longitude, protocol: 'https' });
    } catch (e) {
      const error = e as AxiosError;

      catchError(error);
    }
  }

  if (!weather || !weather.current_weather) {
    return;
  }

  const { temperature, weathercode, is_day } = weather.current_weather;

  const temperatureIsNotSubZero = temperature > 0;
  const signNearTheTemperature = temperatureIsNotSubZero ? '+' : '-';

  $weatherTemp.text(`${signNearTheTemperature}${temperature} °C`);

  const isDay = !!is_day;

  let iconSrc = '999.svg';

  if (weathercode === 0) {
    isDay ? iconSrc = '100.svg' : iconSrc = '150.svg';
  } else if (weathercode === 1) {
    isDay ? iconSrc = '102.svg' : iconSrc = '152.svg';
  } else if (weathercode === 2) {
    isDay ? iconSrc = '101.svg' : iconSrc = '151.svg';
  } else if (weathercode === 3) {
    iconSrc = '104.svg';
  } else if (weathercode === 45) {
    iconSrc = '500.svg';
  } else if (weathercode === 48) {
    iconSrc = '501.svg';
  } else if (weathercode === 51) {
    iconSrc = '309.svg';
  } else if (weathercode === 53) {
    iconSrc = '311.svg';
  } else if (weathercode === 55) {
    iconSrc = '312.svg';
  } else if (weathercode === 56 || weathercode === 57) {
    iconSrc = '309.svg';
  } else if (weathercode === 61) {
    iconSrc = '305.svg';
  } else if (weathercode === 63) {
    iconSrc = '306.svg';
  } else if (weathercode === 65) {
    iconSrc = '307.svg';
  } else if (weathercode === 66 || weathercode === 67) {
    iconSrc = '405.svg';
  } else if (weathercode === 71) {
    iconSrc = '400.svg';
  } else if (weathercode === 73) {
    iconSrc = '401.svg';
  } else if (weathercode === 75) {
    iconSrc = '402.svg';
  } else if (weathercode === 77) {
    iconSrc = '400.svg';
  } else if (weathercode === 80) {
    isDay ? iconSrc = '300.svg' : iconSrc = '350.svg';
  } else if (weathercode === 81 || weathercode === 82) {
    isDay ? iconSrc = '301.svg' : iconSrc = '351.svg';
  } else if (weathercode === 85 || weathercode === 86) {
    isDay ? iconSrc = '407.svg' : iconSrc = '457.svg';
  } else if (weathercode === 95) {
    iconSrc = '302.svg';
  } else if (weathercode === 96 || weathercode === 99) {
    iconSrc = '304.svg';
  }

  $weatherIcon.attr('src', `icons/weather/${iconSrc}`);
  $weatherIcon.css('display', 'inline-block');
}

$(document).ready(() => {
  updateWeather();

  setInterval(() => {
    updateWeather();
  }, 900000); // 15 min
});
