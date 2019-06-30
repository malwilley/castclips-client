const formatAudioLength = (seconds: number, long = false) => {
  const hrs = Math.floor(seconds / 60 / 60);
  const mins = Math.floor((seconds % (60 * 60)) / 60);
  const secs = Math.floor(seconds % 60);

  return [
    {
      label: long ? ' hours' : 'h',
      value: hrs,
    },
    {
      label: long ? ' minutes' : 'm',
      value: mins,
    },
    {
      label: long ? ' seconds' : 's',
      value: secs,
    },
  ]
    .filter(({ value }) => value)
    .reduce((str, { label, value }) => str + ` ${value}${label}`, '');
};

export default formatAudioLength;
