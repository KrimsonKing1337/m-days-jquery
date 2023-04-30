import './Weather.scss';

import type { WeatherResp } from '@types';

import { getCurrentPosition } from 'utils/gpsApi';
import { getCurrentWeather } from 'api';

// todo: update every 15 minutes
$(document).ready(async () => {
  const $weather = $('.js-weather');

  let geoLocation: GeolocationCoordinates | null = null;
  let weather: WeatherResp | null = null;

  try {
    geoLocation = await getCurrentPosition();

    const { latitude, longitude } = geoLocation;

    weather = await getCurrentWeather({ latitude, longitude });
  } catch (e: any) {
    alert(e.message);

    return;
  }

  const temperatureIsNotSubZero = weather?.current_weather.temperature && weather?.current_weather.temperature > 0;
  const signNearTheTemperature = temperatureIsNotSubZero ? '+' : '-';

  $weather.text(`${signNearTheTemperature}${weather?.current_weather.temperature} °C`);
});
