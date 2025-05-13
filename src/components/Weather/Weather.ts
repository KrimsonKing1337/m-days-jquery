import type { AxiosError } from 'axios';
import type { WeatherResp } from 'm-days-core/@types';

import { getSrcOfWeatherIcon } from 'm-days-core/utils';

import { getCurrentPosition } from 'utils/gpsApi';
import { getCurrentWeather } from 'api';
import { printObject } from 'utils/printObject';

import './Weather.scss';

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

let skin = 'default';

export function setSkin(theme: string) {
  const $weather = $('.js-weather');
  const $weatherTemp = $weather.find('.js-weather-temp');

  skin = theme;

  $weatherTemp.addClass(`theme-${theme}`);
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

  const temperaturePrepared = temperatureIsNotSubZero ? temperature : temperature.toString().substring(1);

  let value = `${signNearTheTemperature} ${temperaturePrepared} °C`;

  if (skin === 'cyberpunk') {
    value = `${signNearTheTemperature}${temperaturePrepared}°C`; // without spaces
  }

  $weatherTemp.text(value);

  const iconSrc = getSrcOfWeatherIcon(weathercode, is_day);

  $weatherIcon.attr('src', `icons/weather/${iconSrc}`);
  $weatherIcon.css('display', 'inline-block');
}

$(() => {
  const rootElement = document.querySelector('#root');

  if (!rootElement) {
    return;
  }

  setSkin('default');

  updateWeather();

  setInterval(() => {
    updateWeather();
  }, 900000); // 15 min
});
