export const getPercentForDay = () => {
  const secondsInADay = 24 * 60 * 60;
  const now = new Date();
  const hours = now.getHours() * 60 * 60;
  const minutes = now.getMinutes() * 60;
  const seconds = now.getSeconds();
  const totalSeconds = hours + minutes + seconds;
  const percentSeconds = 100 * totalSeconds/secondsInADay;

  return percentSeconds;
};
