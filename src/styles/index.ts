import boxShadow from 'src/styles/boxShadow';
import colors from 'src/styles/colors';
import fonts from 'src/styles/fonts';
import { CSSObject } from 'create-emotion';

const borderRadius = 8;

const clickable: CSSObject = {
  '&:hover': {
    transform: 'translateY(-2px)',
  },
  '&:active': {
    transform: 'none',
  },
  transition: 'transform 300ms ease-out',
};

export { clickable, borderRadius, boxShadow, colors, fonts };
