const formatNumber = (num: number) => (num < 10 ? `0${num}` : num);

const formatHrMinSec = (seconds: number): string =>
  [Math.floor(seconds / 3600), Math.floor((seconds % 3600) / 60), Math.floor((seconds % 3600) % 60)]
    .map(formatNumber)
    .join(':');

export default formatHrMinSec;
