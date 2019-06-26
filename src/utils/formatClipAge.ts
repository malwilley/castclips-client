import distanceInWordsStrict from 'date-fns/distance_in_words_strict';

const formatClipAge = (createdDate: Date) =>
  distanceInWordsStrict(Date.now(), createdDate, { addSuffix: true });

export default formatClipAge;
