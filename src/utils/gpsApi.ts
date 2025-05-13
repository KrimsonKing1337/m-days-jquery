const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export const getCurrentPosition = () => {
  return new Promise<GeolocationCoordinates>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((pos) => resolve(pos.coords), reject, options);
  });
};
