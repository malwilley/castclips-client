import * as React from 'react';
import { css } from 'emotion';
import { colors } from 'src/styles';
import Header from 'src/modules/header';
import BoxContainer from './BoxContainer';
import zIndex from 'src/styles/zIndex';

type PageWithFeaturedContentProps = {
  bodyContent: React.ReactNode;
  featuredContent: React.ReactNode;
  titleContent: React.ReactNode;
};

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
    overflowX: 'hidden',
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
  header: css({
    gridRowStart: 1,
    gridRowEnd: 2,
    gridColumn: '1 / -1',
  }),
  heroContainer: css({
    gridRowStart: 2,
    gridRowEnd: 4,
    gridColumn: '1 / -1',
    backgroundImage: colors.gradient,
    zIndex: zIndex.background,
  }),
  titleContainer: css({
    '@media (min-width: 800px)': {
      padding: '20px 0 60px 0',
    },
    gridRowStart: 2,
    gridRowEnd: 3,
    gridColumnStart: 2,
    gridColumnEnd: 3,
    color: colors.white,
    padding: '10px 0 40px 0',
    zIndex: zIndex.card,
  }),
};

const PageWithFeaturedContent: React.FC<PageWithFeaturedContentProps> = ({
  bodyContent,
  featuredContent,
  titleContent,
}) => (
  <div className={styles.main}>
    <BoxContainer className={styles.heroContainer} bottom top />
    <div className={styles.titleContainer}>{titleContent}</div>
    <div className={styles.body}>{bodyContent}</div>
    <div className={styles.feature}>{featuredContent}</div>
    <Header className={styles.header} />
  </div>
);

export default PageWithFeaturedContent;
