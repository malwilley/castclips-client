import * as React from 'react';
import { css } from 'emotion';
import { colors } from 'src/styles';
import Header from 'src/modules/header';

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
    gridTemplateRows: 'auto auto auto 40px auto',
  }),
  body: css({
    gridColumnStart: 2,
    gridColumnEnd: 3,
    gridRowStart: 5,
    gridRowEnd: -1,
    padding: '40px 0',
  }),
  feature: css({
    gridColumnStart: 2,
    gridColumnEnd: 3,
    gridRowStart: 3,
    gridRowEnd: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  header: css({
    gridRowStart: 1,
    gridRowEnd: 2,
    gridColumn: '1 / -1',
  }),
  hero: css({
    backgroundImage: colors.gradient2,
    gridRowStart: 2,
    gridRowEnd: 4,
    gridColumn: '1 / -1',
  }),
  titleContainer: css({
    '@media (max-width: 800px)': {
      padding: '40px 0',
    },
    gridRowStart: 2,
    gridRowEnd: 3,
    gridColumnStart: 2,
    gridColumnEnd: 3,
    color: colors.lightest,
    padding: '60px 0',
  }),
};

const PageWithFeaturedContent: React.FC<PageWithFeaturedContentProps> = ({
  bodyContent,
  featuredContent,
  titleContent,
}) => (
  <div className={styles.main}>
    <div className={styles.hero} />
    <div className={styles.titleContainer}>{titleContent}</div>
    <div className={styles.body}>{bodyContent}</div>
    <div className={styles.feature}>{featuredContent}</div>
    <Header className={styles.header} />
  </div>
);

export default PageWithFeaturedContent;
