import React from 'react';
import { css } from 'emotion';
import { fonts, colors } from 'styles';

type AttributeProps = {
  icon: React.ReactNode;
};

const styles = {
  main: css(fonts.text300, {
    display: 'flex',
    alignItems: 'center',
    color: colors.gray700,
    marginBottom: '0.75em',
  }),
  icon: css({
    '& > svg': {
      height: 16,
      width: 16,
    },
    color: colors.primary500,
    backgroundColor: colors.secondary20,
    height: 30,
    width: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderRadius: '50%',
    flexShrink: 0,
  }),
  content: css({
    flexGrow: 1,
    width: 0,
  }),
};

const Attribute: React.FC<AttributeProps> = ({ children, icon }) => (
  <div className={styles.main}>
    <div className={styles.icon}>{icon}</div>
    <div className={styles.content}>{children}</div>
  </div>
);

export default Attribute;
