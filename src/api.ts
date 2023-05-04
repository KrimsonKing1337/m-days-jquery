// import queryString from 'query-string';

import { WeatherResp } from './@types';
import { fetchAsync } from './utils/fetchAsync';

export type getCurrentWeatherParams = {
  latitude: number;
  longitude: number;
};

export async function getCurrentWeather({ latitude, longitude }: getCurrentWeatherParams): Promise<WeatherResp> {
  const params = {
    latitude,
    longitude,
    current_weather: true,
  };

  console.log(params);

  // todo: queryString не работает
  return await fetchAsync(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
}

export async function getTestWeather(): Promise<WeatherResp> {
  return await fetchAsync(`https://api.open-meteo.com/v1/forecast`);
}
