import { CSSObject } from 'create-emotion';
import colors from './colors';

const heading: CSSObject = {
  fontWeight: 900,
};
const bold: CSSObject = {
  fontWeight: 700,
};
const text: CSSObject = {
  fontWeight: 'normal',
  lineHeight: 1.3,
};
const attribute: CSSObject = {
  '& > svg': {
    color: colors.gray200,
    height: '1.2em',
    width: '1.2em',
    marginRight: '0.5em',
  },
  display: 'flex',
  alignItems: 'center',
  fontWeight: 'normal',
  color: colors.gray300,
  marginRight: '1em',
};

const fonts = {
  heading700: {
    ...heading,
    fontSize: '2rem',
  },
  heading400: {
    ...heading,
    fontSize: '1.2rem',
  },
  heading300: {
    ...heading,
    fontSize: '1rem',
  },
  heading200: {
    ...heading,
    fontSize: '0.8rem',
  },
  heading100: {
    ...heading,
    fontSize: '0.7rem',
  },
  bold200: {
    ...bold,
    fontSize: '0.75rem',
  },
  bold250: {
    ...bold,
    fontSize: '0.9rem',
  },
  bold300: {
    ...bold,
    fontSize: '1rem',
  },
  bold400: {
    ...bold,
    fontSize: '1.2rem',
  },
  text300: {
    ...text,
    fontSize: '1rem',
  },
  text200: {
    ...text,
    fontSize: '0.8rem',
  },
  text250: {
    ...text,
    fontSize: '0.9rem',
  },
  attribute300: {
    ...attribute,
    fontSize: '0.75rem',
  },
  attribute200: {
    ...attribute,
    fontSize: '0.7rem',
  },
};

export default fonts;
