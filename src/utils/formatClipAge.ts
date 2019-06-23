import distanceInWords from 'date-fns/distance_in_words';

const formatClipAge = (createdDate: Date) => distanceInWords(createdDate, Date.now());

export default formatClipAge;
