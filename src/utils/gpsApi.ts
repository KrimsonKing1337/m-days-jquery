const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export function getCurrentPosition(
  successCb: (pos: GeolocationPosition) => void,
  errorCb: (pos: GeolocationPositionError) => void,
) {
  navigator.geolocation.getCurrentPosition(successCb, errorCb, options);
}
