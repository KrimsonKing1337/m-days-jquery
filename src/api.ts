import axios from 'axios';

export type getCurrentWeatherParams = {
  latitude: number;
  longitude: number;
};

export async function getCurrentWeather({ latitude, longitude }: getCurrentWeatherParams) {
  const result = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
  );

  return result.data;
}
