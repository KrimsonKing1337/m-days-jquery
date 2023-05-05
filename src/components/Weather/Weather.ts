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

  if (!weather.current_weather) {
    return;
  }

  const { temperature, weathercode } = weather.current_weather;

  const temperatureIsNotSubZero = temperature > 0;
  const signNearTheTemperature = temperatureIsNotSubZero ? '+' : '-';

  $weatherTemp.text(`${signNearTheTemperature}${temperature} °C`);

  let iconSrc = '';

  if (weathercode === 0) {
    iconSrc = 'sun.png';
  } else if (weathercode === 1 || weathercode === 2) {
    iconSrc = 'partly-cloudy-day.png';
  } else if (weathercode === 3) {
    iconSrc = 'cloudy.png';
  } else if (weathercode === 45 || weathercode === 48) {
    iconSrc = 'fog.png';
  } else if (weathercode === 51 || weathercode === 53 || weathercode === 55) {
    iconSrc = 'light-rain.png';
  } else if (weathercode === 56 || weathercode === 57) {
    iconSrc = 'light-snow.png';
  } else if (weathercode === 61) {
    iconSrc = 'light-rain.png';
  } else if (weathercode === 63) {
    iconSrc = 'rain.png';
  } else if (weathercode === 65) {
    iconSrc = 'heavy-rain.png';
  } else if (weathercode === 66 || weathercode === 67) {
    iconSrc = 'sleet.png';
  } else if (weathercode === 71) {
    iconSrc = 'light-snow.png';
  } else if (weathercode === 73 || weathercode === 75) {
    iconSrc = 'snow.png';
  } else if (weathercode === 77) {
    iconSrc = 'light-snow.png';
  } else if (weathercode === 80 || weathercode === 81 || weathercode === 82) {
    iconSrc = 'torrential-rain.png';
  } else if (weathercode === 85 || weathercode === 86) {
    iconSrc = 'snow-storm.png';
  } else if (weathercode === 95) {
    iconSrc = 'storm.png';
  } else if (weathercode === 96 || weathercode === 99) {
    iconSrc = 'hail.png';
  }

  if (iconSrc) {
    $weatherIcon.attr('src', `icons/${iconSrc}`);
    $weatherIcon.css('display', 'inline-block');
  }
}

$(document).ready(() => {
  updateWeather();

  setInterval(() => {
    updateWeather();
  }, 900000); // 15 min
});
