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
    gridTemplateRows: '70px 180px 150px 50px auto',
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
    color: colors.lightest,
    backgroundColor: colors.possibleHeaderColor,
    padding: 20,
  }),
  hero: css({
    backgroundImage: colors.gradient,
    gridRowStart: 2,
    gridRowEnd: 4,
    gridColumn: '1 / -1',
  }),
  titleContainer: css({
    gridRowStart: 2,
    gridRowEnd: 3,
    gridColumnStart: 2,
    gridColumnEnd: 3,
    color: colors.lightest,
    paddingTop: 20,
  }),
};

const InfoPage: React.FC<InfoPageProps> = ({ bodyContent, featuredContent, titleContent }) => (
  <div className={styles.main}>
    <div className={styles.hero} />
    <div className={styles.titleContainer}>{titleContent}</div>
    <div className={styles.body}>{bodyContent}</div>
    <div className={styles.feature}>{featuredContent}</div>
    <header className={styles.header}>
      <h2>castclips</h2>
    </header>
  </div>
);

export default InfoPage;
