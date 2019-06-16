import * as React from 'react';
import { css } from 'emotion';
import { colors } from 'src/styles';

type BoxContainerProps = {
  className?: string;
  containerClassName?: string;
  top?: boolean;
  bottom?: boolean;
};

const styles = {
  main: (top: boolean) =>
    css({
      position: 'relative',
      margin: top ? '-32px auto 0 auto' : '0 auto',
      width: '100%',
      padding: '40px 0',
    }),
  childrenContainer: (top: boolean, bottom: boolean) =>
    css({
      position: 'absolute',
      width: '100%',
      top: top ? 32 : 0,
      bottom: bottom ? 32 : 0,
    }),
  border: css({
    height: 32,
    width: '100%',
    backgroundColor: colors.background,
    position: 'absolute',
  }),
  borderTop: css({
    '@media (max-width: 800px)': {
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
    },
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    top: 0,
  }),
  borderBottom: css({
    '@media (max-width: 800px)': {
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    bottom: 0,
  }),
};

const BoxContainer: React.FC<BoxContainerProps> = ({
  children,
  className,
  containerClassName,
  bottom = false,
  top = false,
}) => (
  <div className={css(styles.main(top), className)}>
    {top && <div className={css(styles.border, styles.borderTop)} />}
    <div className={css(styles.childrenContainer(top, bottom), containerClassName)}>{children}</div>
    {bottom && <div className={css(styles.border, styles.borderBottom)} />}
  </div>
);

export default BoxContainer;
