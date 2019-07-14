import { CSSObject } from 'create-emotion';
import colors from './colors';
import { css } from 'emotion';

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
    height: '1.2em',
    width: '1.2em',
    marginRight: '0.5em',
  },
  display: 'flex',
  alignItems: 'center',
  fontWeight: 'bold',
  color: colors.gray200,
  marginRight: '1em',
};

const fonts = {
  heading700: css({
    ...heading,
    fontSize: '2rem',
  }),
  heading400: css({
    ...heading,
    fontSize: '1.2rem',
  }),
  heading300: css({
    ...heading,
    fontSize: '1rem',
  }),
  heading200: css({
    ...heading,
    fontSize: '0.8rem',
  }),
  heading100: css({
    ...heading,
    fontSize: '0.7rem',
  }),
  bold200: css({
    ...bold,
    fontSize: '0.8rem',
  }),
  bold300: css({
    ...bold,
    fontSize: '1rem',
  }),
  text300: css({
    ...text,
    fontSize: '1rem',
  }),
  text200: css({
    ...text,
    fontSize: '0.8rem',
  }),
  attribute300: css({
    ...attribute,
    fontSize: '0.8rem',
  }),
  attribute200: css({
    ...attribute,
    fontSize: '0.7rem',
  }),
};

export default fonts;
