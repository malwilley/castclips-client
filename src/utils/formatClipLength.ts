const formatClipLength = (seconds: number) => {
  const hrs = Math.floor(seconds / 60 / 60);
  const mins = Math.floor((seconds % (60 * 60)) / 60);
  const secs = Math.floor(seconds % 60);

  return [
    {
      label: 'h',
      value: hrs,
    },
    {
      label: 'm',
      value: mins,
    },
    {
      label: 's',
      value: secs,
    },
  ]
    .filter(({ value }) => value)
    .reduce((str, { label, value }) => str + ` ${value}${label}`, '');
};

export default formatClipLength;
