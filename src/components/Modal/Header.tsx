import * as React from 'react';
import Button from 'src/components/Button';
import { CloseIcon } from 'mdi-react';
import { css } from 'emotion';
import { colors } from 'src/styles';

export type HeaderProps = {
  handleClose: () => void;
  icon: React.ReactNode;
  title: string;
};

const styles = {
  closeButton: css({
    '& > svg': {
      fill: colors.gray100,
      height: 16,
      width: 16,
    },
    height: 28,
    width: 28,
  }),
  icon: css({
    '& > svg': {
      fill: colors.secondary500,
      height: 12,
      width: 12,
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 28,
    width: 28,
    borderRadius: '50%',
    backgroundColor: colors.secondary50,
  }),
  iconTitleContainer: css({
    '& > :not(:last-child)': {
      marginRight: 12,
    },
    display: 'flex',
    alignItems: 'center',
  }),
  main: css({
    height: 60,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: colors.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 12px 0px 16px',
  }),
  title: css({
    color: colors.gray600,
    fontSize: 18,
  }),
};

const Header: React.SFC<HeaderProps> = ({ handleClose, icon, title }) => (
  <div className={styles.main}>
    <div className={styles.iconTitleContainer}>
      <div className={styles.icon}>{icon}</div>
      <h1 className={styles.title}>{title}</h1>
    </div>
    <Button onClick={handleClose} className={styles.closeButton}>
      <CloseIcon />
    </Button>
  </div>
);

export default Header;
