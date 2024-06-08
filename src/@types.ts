export type CurrentWeather = {
  is_day: 0 | 1;
  temperature: number;
  time: string;
  weathercode: number;
  winddirection: number;
  windspeed: number;
};

export type WeatherResp = {
  current_weather: CurrentWeather;
  elevation: number;
  generationtime_ms: number;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}

export enum Themes {
  'default' = 'default',
  'cyberpunk' = 'cyberpunk',
}

export type Preset = {
  [key: string]: string;

  id: string;
  staticTopics: string;
  dynamicTopics: string;
  resolution: string;
  skin: string;
  formats: string;
  fileSize: string;
};
