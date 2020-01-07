import * as React from 'react'
import { css } from 'emotion'
import { colors } from 'styles'
import zIndex from 'styles/zIndex'
import RoundedCorners from './RoundedCorners'

type PageWithFeaturedContentProps = {
  bodyContent: React.ReactNode
  featuredContent: React.ReactNode
  titleContent: React.ReactNode
}

const styles = {
  main: css({
    '@media (max-width: 1800px)': {
      gridTemplateColumns: '1fr 1000px 1fr',
    },
    '@media (max-width: 1030px)': {
      gridTemplateColumns: '15px 1fr 15px',
    },
    display: 'grid',
    gridTemplateColumns: '1fr 1200px 1fr',
    gridTemplateRows: 'auto auto auto 6px auto',
  }),
  body: css({
    gridColumnStart: 2,
    gridColumnEnd: 3,
    gridRowStart: 5,
    gridRowEnd: -1,
  }),
  feature: css({
    gridColumnStart: 2,
    gridColumnEnd: 3,
    gridRowStart: 3,
    gridRowEnd: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: zIndex.card,
  }),
  heroContainer: css({
    '@media (max-width: 800px)': {
      borderRadius: '8px 8px 0 0',
    },
    gridRowStart: 2,
    gridRowEnd: 4,
    gridColumn: '1 / -1',
    backgroundImage: colors.gradient,
    borderRadius: '16px 16px 0 0',
    position: 'relative',
    zIndex: zIndex.feature,
  }),
  bodyRounding: css({
    position: 'absolute',
    bottom: 0,
    zIndex: zIndex.body,
  }),
  titleContainer: css({
    '@media (min-width: 800px)': {
      padding: '3.5rem 0 4rem 0',
    },
    gridRowStart: 2,
    gridRowEnd: 3,
    gridColumnStart: 2,
    gridColumnEnd: 3,
    color: colors.white,
    padding: '2rem 0 2rem 0',
    zIndex: zIndex.card,
  }),
}

const PageWithFeaturedContent: React.FC<PageWithFeaturedContentProps> = ({
  bodyContent,
  featuredContent,
  titleContent,
}) => (
  <div className={styles.main}>
    <div className={styles.heroContainer}>
      <RoundedCorners className={styles.bodyRounding} top />
    </div>
    <div className={styles.titleContainer}>{titleContent}</div>
    <div className={styles.body}>{bodyContent}</div>
    <div className={styles.feature}>{featuredContent}</div>
  </div>
)

export default PageWithFeaturedContent
