import * as React from 'react';
import { css } from 'emotion';
import { colors } from '~/styles';
import Header from '~/modules/header';

const styles = {
  main: css({
    display: 'grid',
    gridTemplateRows: '[gradient] 500px',
  }),
  gradientContainer: css({
    backgroundImage: colors.gradient,
    gridTemplateAreas: 'gradient',
    color: colors.lightest,
  }),
  header: css({
    background: 'none',
  }),
  headerText: css({
    marginTop: 100,
    textAlign: 'center',
    letterSpacing: 1,
  }),
};

const HomePage: React.FC = () => (
  <div className={styles.main}>
    <div className={styles.gradientContainer}>
      <Header className={styles.header} />
      <h1 className={styles.headerText}>Share your favorite podcast moments</h1>
    </div>
  </div>
);

export default HomePage;
