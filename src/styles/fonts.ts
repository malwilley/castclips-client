import { CSSObject } from 'create-emotion';
import colors from './colors';
import { css } from 'emotion';

const heading: CSSObject = {
  fontWeight: 'bold',
};
const text: CSSObject = {
  fontWeight: 'normal',
};
const attribute: CSSObject = {
  '& > svg': {
    marginRight: '0.5em',
  },
  display: 'flex',
  alignItems: 'center',
  fontWeight: 'bold',
  textTransform: 'uppercase',
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
    fontSize: '0.7rem',
    letterSpacing: '0.05rem',
  }),
};

export default fonts;
