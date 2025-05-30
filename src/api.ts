import axios, { type AxiosResponse } from 'axios';

import type { Preset, WeatherResp } from './@types';

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

export function getContentOptions() {
  return axios.get('/content-options');
}

export function putNewPreset(newPreset: Preset) {
  const params = new URLSearchParams();

  Object.keys(newPreset).forEach((key) => {
    const value = newPreset[key];

    params.append(key, value);
  });

  return axios.put('/api', params);
}

export function deletePreset(id: string) {
  return axios.delete('/api', {
    data: { id },
  });
}

export async function getInfoAboutPreset(id: string): Promise<Preset> {
  const result = await axios.get('/api', {
    params: { id },
  });

  return result.data;
}
