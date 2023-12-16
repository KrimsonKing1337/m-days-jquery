import axios, { AxiosResponse } from 'axios';

import { WeatherResp } from './@types';

export type getCurrentWeatherParams = {
  latitude: number;
  longitude: number;
  protocol: 'http' | 'https';
};

export async function getCurrentWeather({ protocol, latitude, longitude }: getCurrentWeatherParams) {
  const params = {
    latitude,
    longitude,
    current_weather: true,
  };

  console.log(`latitude: ${params.latitude}, longitude: ${params.longitude}`);

  /*
  если делать https запрос, у safari на старых ios возникает ошибка: не могу установить безопасное соединение
  поэтому, отрываем приложение через https, но запрос на погоду делаем через http

  todo: но начиная с iphone 5 (проверить на iphone 4S) Сафари не разрешает заходить с https, но делать запросы на http.
   попытаться определять по user-agent или ещё по каким-нибудь особенностям какой перед нами девайс и в зависимости
   от этого запросы швырять либо на http, либо на https
  */
  const result: AxiosResponse<WeatherResp> = await axios.get(`${protocol}://api.open-meteo.com/v1/forecast`, { params });

  return result.data;
}

export function getBg() {
  const searchParams = new URLSearchParams(window.location.search);

  const topics = searchParams.get('topics');
  const imagesVariant = searchParams.get('imagesVariant');
  const preset = searchParams.get('preset');

  const reqParams = {
    topics,
    imagesVariant,
    preset,
  };

  return axios.get('http://localhost:3000/bg', {
    responseType: 'blob',
    params: reqParams,
  });
}
