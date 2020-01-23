import colors from './colors'
import fonts from './fonts'
import { Interpolation } from 'emotion'

const global: Interpolation = {
  a: {
    textDecoration: 'none',
    color: 'inherit',
  },
  '*, *:before, *:after': {
    boxSizing: 'border-box',
  },
  body: {
    margin: '0',
    padding: '0',
    background: colors.gray20,
    color: colors.gray700,
    fontFamily: "'Nunito', sans-serif",
    ...fonts.text300,
  },
  'h1, h2, h3, h4, h5, h6': {
    margin: '0',
    fontWeight: 900,
  },
  'input, textarea': {
    background: 'none',
    outline: 'none',
    color: 'inherit',
    fontWeight: 'inherit',
    fontSize: 'inherit',
    letterSpacing: 'inherit',
  },
  'ul, li': {
    listStyle: 'none',
    margin: 0,
  },
}

export default global
