import * as React from 'react';
import { css } from 'emotion';
import { colors } from '~/styles';

type InfoPageProps = {
  bodyContent: React.ReactNode;
  featuredContent: React.ReactNode;
  titleContent: React.ReactNode;
};

const styles = {
  main: css({
    display: 'grid',
    gridTemplateColumns: '1fr 1000px 1fr',
    gridTemplateRows: '70px 150px 100px 100px auto',
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
  }),
  header: css({
    gridRowStart: 1,
    gridRowEnd: 2,
    gridColumn: '1 / -1',
    textAlign: 'left',
  }),
  hero: css({
    backgroundImage: colors.gradient,
    gridRowStart: 1,
    gridRowEnd: 4,
    gridColumn: '1 / -1',
  }),
  titleContainer: css({
    gridRowStart: 2,
    gridRowEnd: 3,
    gridColumnStart: 2,
    gridColumnEnd: 3,
    color: colors.lightest,
  }),
};

const InfoPage: React.FC<InfoPageProps> = ({ bodyContent, featuredContent, titleContent }) => (
  <div className={styles.main}>
    <header className={styles.header}>
      <div>castclips</div>
    </header>
    <div className={styles.hero} />
    <div className={styles.titleContainer}>{titleContent}</div>
    <div className={styles.body}>{bodyContent}</div>
    <div className={styles.feature}>{featuredContent}</div>
  </div>
);

export default InfoPage;
