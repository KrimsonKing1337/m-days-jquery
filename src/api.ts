import axios, { AxiosResponse } from 'axios';

import { WeatherResp } from './@types';

export type getCurrentWeatherParams = {
  latitude: number;
  longitude: number;
};

export async function getCurrentWeather({ latitude, longitude }: getCurrentWeatherParams) {
  const params = {
    latitude,
    longitude,
    current_weather: true,
  };

  console.log(`latitude: ${params.latitude}, longitude: ${params.longitude}`);

  // если делать https запрос, у safari на старых ios возникает ошибка: не могу установить безопасное соединение
  // поэтому, отрываем приложение через https, но запрос на погоду делаем через http
  const result: AxiosResponse<WeatherResp> = await axios.get(`http://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);

  return result.data;
}
