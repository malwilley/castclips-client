import { Interpolation } from 'create-emotion'

const makeBreakpoint = (width: number) => (css: Interpolation) => ({
  [`@media (min-width: ${width}px)`]: css,
})

const breakpoints = {
  breakpoint400: makeBreakpoint(400),
  breakpoint600: makeBreakpoint(600),
  breakpoint800: makeBreakpoint(800),
  breakpoint1800: makeBreakpoint(1800),
}

export default breakpoints
