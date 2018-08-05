import { css } from 'emotion';
import colors from './colors';

const card = css({
  backgroundColor: 'var(--color-lightest)',
  color: 'var(--color-dark)',
  boxShadow: 'var(--card-dropshadow)',
  width: '95%',
  maxWidth: 700,
  borderRadius: 'var(--border-radius)',
  maxHeight: '250px',
  overflow: 'hidden',
  transition: 'height 300ms ease-out',
  zIndex: 1000,
});

const downHalf = css({
  position: 'absolute',
  bottom: 0,
  left: '50%',
  transform: 'translate(-50%, 50%)',
});

const animateSlideToFifty = css({
  animation: 'slide-to-fifty ease-out 300ms',
});

const animateSlideToNormal = css({
  animation: 'slide-to-normal ease-out 300ms',
});

export { animateSlideToFifty, animateSlideToNormal, card, colors, downHalf };
