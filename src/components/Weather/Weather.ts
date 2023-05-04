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

  let geoLocation: GeolocationCoordinates | null = null;
  let weather: WeatherResp | null = null;

  try {
    geoLocation = await getCurrentPosition();

    const { latitude, longitude } = geoLocation;

    weather = await getCurrentWeather({ latitude, longitude });
  } catch (e) {
    const error = e as AxiosError;

    catchError(error);

    return;
  }

  const temperatureIsNotSubZero = weather?.current_weather.temperature && weather?.current_weather.temperature > 0;
  const signNearTheTemperature = temperatureIsNotSubZero ? '+' : '-';

  $weather.text(`${signNearTheTemperature}${weather?.current_weather.temperature} °C`);
}

$(document).ready(() => {
  updateWeather();

  setInterval(() => {
    updateWeather();
  }, 900000); // 15 min
});
