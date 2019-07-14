import { dropLast, last } from 'ramda';

const sanitizeUrl = (url: string) => {
  const regex = /https?:\/\/(?:www.)?(.*)\?utm/;
  const result = regex.exec(url);

  if (!result || !result[1]) {
    return url;
  }

  const formatted = result[1];
  return last(formatted) === '/' ? dropLast(1, formatted) : formatted;
};

export default sanitizeUrl;
