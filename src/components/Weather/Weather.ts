import './Weather.scss';

import type { WeatherResp } from '@types';

import { getCurrentPosition } from 'utils/gpsApi';
import { getCurrentWeather } from 'api';

async function updateWeather() {
  const $weather = $('.js-weather');

  let geoLocation: GeolocationCoordinates | null = null;
  let weather: WeatherResp | null = null;

  try {
    geoLocation = await getCurrentPosition();

    const { latitude, longitude } = geoLocation;

    weather = await getCurrentWeather({ latitude, longitude });
  } catch (e: any) {
    console.warn(e.message);

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
