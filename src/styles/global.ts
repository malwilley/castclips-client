import { CSSObject } from 'create-emotion';

const global = {
  ':root': {
    '--h-font': "'Nunito', sans-serif",
    '--p-font': "'Nunito', sans-serif",
  },
  a: {
    textDecoration: 'none',
    color: 'inherit',
  },
  body: {
    margin: '0',
    padding: '0',
    background: 'var(--color-light)',
    color: 'var(--color-darkest)',
    fontFamily: 'var(--p-font)',
    fontWeight: 'var(--normal-weight)',
    fontSize: '1rem',
  },
  'h1, h2, h3, h4, h5': {
    fontFamily: 'var(--h-font)',
    fontWeight: 'var(--bold-weight)',
    margin: '0',
  },
  input: {
    background: 'none',
    fontFamily: 'var(--p-font)',
    fontSize: '14px',
    outline: 'none',
    color: 'inherit',
    fontWeight: 'inherit',
    letterSpacing: 'inherit',
  },
};

export default global;
