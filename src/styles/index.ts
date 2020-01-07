import boxShadow from 'styles/boxShadow'
import breakpoints from 'styles/breakpoints'
import colors from 'styles/colors'
import fonts from 'styles/fonts'
import { CSSObject } from 'create-emotion'
import zIndex from './zIndex'

const borderRadius = 8

const clickable: CSSObject = {
  '&:hover': {
    transform: 'translateY(-2px)',
  },
  '&:active': {
    transform: 'none',
  },
  display: 'inline-block',
  transition: 'transform 300ms ease-out',
}

const coverContainer: CSSObject = {
  '&::after': {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    content: '""',
    zIndex: zIndex.card,
  },
}

export { breakpoints, clickable, coverContainer, borderRadius, boxShadow, colors, fonts }
